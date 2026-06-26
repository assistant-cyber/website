'use strict';

/**
 * Sourcing Worker
 * ───────────────
 * Scans the Google Sheet for rows with Status = "Pending", runs the AI
 * sourcing agent on each one, writes results back to the sheet, and fires
 * the manager notification email.
 *
 * Run directly:  node src/sourcing-worker.js
 * Scheduled via: OpenClaw cron (every 30 min)
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const crypto = require('crypto');
const { getPendingRows, markAsSourcing, updateRowWithResults } = require('./sheets');
const { runSourcingAgent }                                      = require('./agent');

const BASE_URL        = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const APPROVAL_SECRET = process.env.APPROVAL_SECRET || 'change-me';

// ─── Token (mirrors server.js) ────────────────────────────────────────────

function generateToken(rowNumber) {
  return crypto
    .createHmac('sha256', APPROVAL_SECRET)
    .update(`${rowNumber}:${process.env.MANAGER_EMAIL || 'manager'}`)
    .digest('hex')
    .slice(0, 40);
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function run() {
  const startedAt = new Date().toISOString();
  console.log(`\n[worker] ─── Sourcing worker started at ${startedAt} ───`);

  // 1. Find pending rows
  let pending;
  try {
    pending = await getPendingRows();
  } catch (err) {
    console.error('[worker] Failed to read sheet:', err.message);
    process.exit(1);
  }

  if (pending.length === 0) {
    console.log('[worker] No pending rows — nothing to do.');
    return { processed: 0, skipped: 0, errors: 0 };
  }

  console.log(`[worker] Found ${pending.length} pending row(s).`);

  const results = { processed: 0, skipped: 0, errors: 0, rows: [] };

  for (const { rowNumber, form } of pending) {
    console.log(`\n[worker] Row #${rowNumber}: "${form.itemDescription}" (qty ${form.quantity})`);

    // 2. Lock the row immediately so a concurrent run won't touch it
    try {
      await markAsSourcing(rowNumber);
    } catch (err) {
      console.error(`[worker] Could not lock row #${rowNumber}:`, err.message);
      results.skipped++;
      continue;
    }

    // 3. Run the AI sourcing agent
    let agentResult;
    try {
      console.log(`[worker] Running sourcing agent…`);
      agentResult = await runSourcingAgent(form);
      console.log(`[worker] ✓ ${agentResult.sourced_product_name} @ ${agentResult.unit_price} from ${agentResult.supplier}`);
    } catch (err) {
      console.error(`[worker] Agent error:`, err.message);
      agentResult = {
        sourced_product_name: `${form.itemDescription} — Manual sourcing required`,
        supplier:             form.preferredSupplier || 'TBD',
        unit_price:           '$TBD',
        total_price:          '$TBD',
        product_url:          `https://www.grainger.com/search?searchQuery=${encodeURIComponent(form.itemDescription)}`,
        delivery_estimate:    'Contact supplier',
        notes:                `Agent failed: ${err.message}. Please source manually.`,
      };
      results.errors++;
    }

    // 4. Write results back to sheet (cols H–N, sets Status → "Pending Approval")
    try {
      await updateRowWithResults(rowNumber, agentResult);
      console.log(`[worker] ✓ Sheet row #${rowNumber} updated`);
    } catch (err) {
      console.error(`[worker] Sheet update error for row #${rowNumber}:`, err.message);
      results.errors++;
    }

    // 5. Email step is disabled — no SMTP creds configured. Notify manager
    //    some other way (Slack, check the sheet, etc).
    //    To re-enable: uncomment below, set SMTP creds in .env, and import sendManagerNotification.
    //
    //    const token = generateToken(rowNumber);
    //    await sendManagerNotification(form, agentResult, rowNumber, token, BASE_URL);
    //    console.log(`[worker] ✓ Manager notified for row #${rowNumber}`);
    console.log(`[worker] (manager notification skipped — email disabled)`);

    results.processed++;
    results.rows.push({
      row:     rowNumber,
      item:    form.itemDescription,
      product: agentResult.sourced_product_name,
      price:   agentResult.total_price,
    });
  }

  console.log(`\n[worker] ─── Done: ${results.processed} processed, ${results.skipped} skipped, ${results.errors} errors ───\n`);
  return results;
}

// ─── Entry point ──────────────────────────────────────────────────────────

run()
  .then(summary => {
    // Print a clean summary line for cron job logs / agent output
    if (summary.processed > 0) {
      console.log('SUMMARY:', JSON.stringify(summary, null, 2));
    }
  })
  .catch(err => {
    console.error('[worker] Fatal:', err);
    process.exit(1);
  });
