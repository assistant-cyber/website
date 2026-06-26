'use strict';

const Anthropic = require('@anthropic-ai/sdk');

// ─── System prompt ────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a purchasing agent for a US construction and trade company.

YOUR ONLY JOB: find the best matching product for the employee's request and return a JSON object.

SEARCH STRATEGY:
1. Search for the exact item (or best match) on: Home Depot, Lowe's, Amazon, Amazon Business, Grainger, Fastenal, Menards, McMaster-Carr, True Value, Ace Hardware, Toolstation, Northern Tool.
2. Compare at least 2–3 suppliers before deciding.
3. Prefer in-stock items with real product pages.
4. If the request has multiple items, pick the best combined product or bundle that covers all items, or pick the best for each and list both in the notes.

OUTPUT FORMAT — MANDATORY:
You MUST respond with ONLY a raw JSON object. No markdown. No code fences. No explanation text. No preamble. Just the JSON.

{
  "sourced_product_name": "Full product name including brand, model, and key specs",
  "supplier": "Supplier name (e.g. Home Depot, Amazon, Grainger)",
  "unit_price": "$XX.XX",
  "total_price": "$XX.XX  (unit_price × quantity)",
  "product_url": "https://direct-product-page-url",
  "delivery_estimate": "e.g. '2–3 business days' or 'Available in-store'",
  "notes": "Brief notes — substitutions made, why you chose this, stock caveats, etc."
}

CRITICAL RULES:
- ALWAYS produce valid JSON. Never output plain text.
- ALWAYS include a real product URL (from your search or from your knowledge of that retailer's URL structure).
- If you can't find an exact match, pick the closest equivalent and explain in notes.
- If the request is ambiguous, make a reasonable professional interpretation.
- total_price = unit_price × quantity (calculate it).`;

// ─── Helpers ──────────────────────────────────────────────────────────────

function buildPrompt(form) {
  const requester = [form.firstName, form.lastName].filter(Boolean).join(' ') || 'Unknown';
  return [
    '=== PURCHASE REQUEST ===',
    `Requester:         ${requester}`,
    `Project:           ${form.project || 'Not specified'}`,
    `Item:              ${form.itemDescription}`,
    `Quantity:          ${form.quantity}`,
    form.neededBy ? `Needed by:         ${form.neededBy}` : '',
    form.submissionId ? `Submission ID:    ${form.submissionId}` : '',
    '',
    'Search for this product now and return the JSON result.',
  ].filter(Boolean).join('\n');
}

/**
 * Robustly extract a JSON object from Claude's response text.
 * Handles: raw JSON, markdown code fences, leading/trailing prose.
 */
function extractJSON(text) {
  if (!text) return null;

  // Strip markdown code fences
  let cleaned = text
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/gi, '')
    .trim();

  // Try the whole string first
  try {
    const parsed = JSON.parse(cleaned);
    if (parsed && typeof parsed === 'object' && parsed.sourced_product_name) return parsed;
  } catch (_) {}

  // Find the outermost {...} block
  const start = cleaned.indexOf('{');
  const end   = cleaned.lastIndexOf('}');
  if (start !== -1 && end > start) {
    try {
      const parsed = JSON.parse(cleaned.slice(start, end + 1));
      if (parsed && typeof parsed === 'object' && parsed.sourced_product_name) return parsed;
    } catch (_) {}
  }

  return null;
}

function fallback(form) {
  return {
    sourced_product_name: `${form.itemDescription} — Manual sourcing required`,
    supplier:             form.preferredSupplier || 'TBD',
    unit_price:           '$TBD',
    total_price:          '$TBD',
    product_url:          `https://www.grainger.com/search?searchQuery=${encodeURIComponent(form.itemDescription)}`,
    delivery_estimate:    'Contact supplier',
    notes:                'Agent could not produce a structured result. Please source manually.',
  };
}

// ─── Core tool loop ───────────────────────────────────────────────────────

async function runLoop(client, messages) {
  const MAX_TURNS = 14;

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    let response;
    try {
      response = await client.messages.create({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system:     SYSTEM_PROMPT,
        tools: [{
          type:     'web_search_20250305',
          name:     'web_search',
          max_uses: 8,
        }],
        messages,
      });
    } catch (err) {
      throw new Error(`Anthropic API: ${err.message}`);
    }

    const textBlock = response.content.find(b => b.type === 'text');

    if (response.stop_reason === 'end_turn') {
      return { text: textBlock?.text || '', messages };
    }

    // Accumulate the assistant turn
    messages.push({ role: 'assistant', content: response.content });

    if (response.stop_reason === 'tool_use') {
      const toolResults = response.content
        .filter(b => b.type === 'tool_use')
        .map(b => ({
          type:        'tool_result',
          tool_use_id: b.id,
          content:     [],   // server-side web_search: Anthropic injects the results
        }));

      if (toolResults.length > 0) {
        messages.push({ role: 'user', content: toolResults });
      }
      continue;
    }

    // Any other stop reason (max_tokens etc.)
    if (textBlock) return { text: textBlock.text, messages };
    break;
  }

  return { text: '', messages };
}

// ─── Second-pass rescue ───────────────────────────────────────────────────
// If pass 1 returns text but we can't parse JSON from it, send the whole
// conversation back and explicitly ask Claude to reformat as JSON only.

async function rescuePass(client, priorMessages, rawText) {
  const rescueMessages = [
    ...priorMessages,
    {
      role: 'user',
      content:
        'Your previous response was not valid JSON. ' +
        'Take your research findings above and output ONLY the JSON object — ' +
        'no markdown, no explanation, no code fences. ' +
        'Start your response with { and end with }.',
    },
  ];

  try {
    const res = await client.messages.create({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system:     SYSTEM_PROMPT,
      messages:   rescueMessages,
    });
    const textBlock = res.content.find(b => b.type === 'text');
    return textBlock?.text || '';
  } catch (_) {
    return rawText; // give up gracefully
  }
}

// ─── Public API ───────────────────────────────────────────────────────────

async function runSourcingAgent(form) {
  const client   = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const messages = [{ role: 'user', content: buildPrompt(form) }];

  // ── Pass 1: web search + tool loop ──────────────────────────────────────
  console.log(`  [agent] Pass 1 — web search agent`);
  const { text: rawText, messages: finalMessages } = await runLoop(client, messages);

  console.log(`  [agent] Raw response (first 300 chars): ${rawText.slice(0, 300)}`);

  let result = extractJSON(rawText);
  if (result) {
    console.log(`  [agent] ✓ JSON parsed on pass 1`);
    return result;
  }

  // ── Pass 2: ask Claude to reformat the text it produced ─────────────────
  console.log(`  [agent] Pass 1 JSON extraction failed — running rescue pass`);
  const rescuedText = await rescuePass(client, finalMessages, rawText);

  console.log(`  [agent] Rescue response (first 300 chars): ${rescuedText.slice(0, 300)}`);

  result = extractJSON(rescuedText);
  if (result) {
    console.log(`  [agent] ✓ JSON parsed on rescue pass`);
    return result;
  }

  // ── Pass 3: Claude using only training knowledge (no web search) ─────────
  console.log(`  [agent] Rescue pass failed — running knowledge-only fallback pass`);
  try {
    const knowledgeRes = await client.messages.create({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system:     SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: buildPrompt(form) },
        {
          role: 'user',
          content:
            'Web search is unavailable. Use your training knowledge of US retailer product catalogues ' +
            '(Home Depot, Amazon, Grainger, Lowe\'s) to recommend the best available product. ' +
            'Construct a plausible product URL. Output ONLY the JSON object.',
        },
      ],
    });
    const tb = knowledgeRes.content.find(b => b.type === 'text');
    result = extractJSON(tb?.text || '');
    if (result) {
      console.log(`  [agent] ✓ JSON parsed on knowledge-only pass`);
      result.notes = (result.notes || '') + ' [Note: sourced from training data, not live search — verify price/availability]';
      return result;
    }
  } catch (err) {
    console.error(`  [agent] Knowledge pass error: ${err.message}`);
  }

  console.error(`  [agent] All passes failed — using manual fallback`);
  return fallback(form);
}

module.exports = { runSourcingAgent };
