'use strict';

require('dotenv').config();

const express  = require('express');
const crypto   = require('crypto');
const path     = require('path');
const cors     = require('cors');

const { appendRequest, approveRow, rejectRow }             = require('./src/sheets');
const { sendManagerNotification }                          = require('./src/email');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Config ───────────────────────────────────────────────────────────────

const SHEET_URL      = 'https://docs.google.com/spreadsheets/d/1DolSihbqo2G4_YgtnWnqYllOfwZJdtdvKTY5wf0vrqQ/edit';
const APPROVAL_SECRET = process.env.APPROVAL_SECRET || 'change-me';
const BASE_URL       = (process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`).replace(/\/$/, '');

// ─── Approval token helpers (HMAC — stateless) ───────────────────────────

function generateToken(rowNumber) {
  return crypto
    .createHmac('sha256', APPROVAL_SECRET)
    .update(`${rowNumber}:${process.env.MANAGER_EMAIL || 'manager'}`)
    .digest('hex')
    .slice(0, 40);
}

function verifyToken(rowNumber, token) {
  const expected = generateToken(rowNumber);
  // Use timingSafeEqual to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(token.slice(0, 40).padEnd(40, '0'), 'hex'),
    );
  } catch {
    return false;
  }
}

// ─── POST /api/submit ─────────────────────────────────────────────────────

app.post('/api/submit', async (req, res) => {
  // Give the response up to 3 minutes — agent + web search can be slow
  req.setTimeout(180_000);
  res.setTimeout(180_000);

  try {
    const form = req.body;

    // Validate required fields
    const REQUIRED = ['firstName', 'lastName', 'project', 'itemDescription', 'quantity'];
    const missing  = REQUIRED.filter(f => !form[f] || String(form[f]).trim() === '');
    if (missing.length) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
    }

    console.log(`[submit] New request from ${form.firstName} ${form.lastName}: "${form.itemDescription}" (qty ${form.quantity})`);

    // Write to Google Sheets (cols A–L, Status = "Pending")
    // The sourcing agent runs separately via a scheduled cron job.
    let rowNumber;
    try {
      rowNumber = await appendRequest(form);
      console.log(`[sheets] Appended row #${rowNumber} — status: Pending`);
    } catch (err) {
      console.error('[sheets] Failed to append:', err.message);
      return res.status(500).json({ error: `Google Sheets error: ${err.message}` });
    }

    res.json({
      success:  true,
      rowNumber,
      sheetUrl: SHEET_URL,
    });

  } catch (err) {
    console.error('[submit] Unhandled error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// ─── GET /approve?row=X&token=Y ───────────────────────────────────────────

app.get('/approve', async (req, res) => {
  const { row, token } = req.query;
  if (!row || !token) return res.status(400).send(errorPage('Missing row or token parameter.'));

  const rowNum = parseInt(row, 10);
  if (isNaN(rowNum)) return res.status(400).send(errorPage('Invalid row number.'));

  if (!verifyToken(rowNum, token)) return res.status(403).send(errorPage('Invalid or expired approval token.'));

  try {
    const managerEmail = process.env.MANAGER_EMAIL || 'manager';
    await approveRow(rowNum, managerEmail);
    console.log(`[approve] Row #${rowNum} approved by ${managerEmail}`);

    res.send(resultPage('✅', 'Request Approved', `Row #${rowNum} has been approved.`, '#1D9E75'));
  } catch (err) {
    console.error('[approve] Error:', err.message);
    res.status(500).send(errorPage(`Failed to update sheet: ${err.message}`));
  }
});

// ─── GET /reject?row=X&token=Y ────────────────────────────────────────────

app.get('/reject', async (req, res) => {
  const { row, token } = req.query;
  if (!row || !token) return res.status(400).send(errorPage('Missing row or token parameter.'));

  const rowNum = parseInt(row, 10);
  if (isNaN(rowNum)) return res.status(400).send(errorPage('Invalid row number.'));

  if (!verifyToken(rowNum, token)) return res.status(403).send(errorPage('Invalid or expired approval token.'));

  try {
    await rejectRow(rowNum);
    console.log(`[reject] Row #${rowNum} rejected`);

    res.send(resultPage('❌', 'Request Rejected', `Row #${rowNum} has been rejected.`, '#DC2626'));
  } catch (err) {
    console.error('[reject] Error:', err.message);
    res.status(500).send(errorPage(`Failed to update sheet: ${err.message}`));
  }
});

// ─── Simple HTML response templates ──────────────────────────────────────

function baseLayout(body) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Purchase Request System</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
       background:#F7F8FA;color:#111827;display:flex;align-items:center;
       justify-content:center;min-height:100vh;padding:24px}
  .card{background:#fff;border-radius:16px;padding:48px 40px;
        max-width:520px;width:100%;text-align:center;
        box-shadow:0 1px 4px rgba(0,0,0,.08),0 0 0 1px #E5E7EB}
  .icon{font-size:56px;margin-bottom:20px}
  h1{font-size:24px;font-weight:700;margin-bottom:12px}
  p{color:#6B7280;line-height:1.6;margin-bottom:16px}
  a{color:#1D9E75;text-decoration:none;font-weight:500}
  a:hover{text-decoration:underline}
</style></head><body>${body}</body></html>`;
}

function resultPage(icon, title, message, color) {
  return baseLayout(`<div class="card">
    <div class="icon">${icon}</div>
    <h1 style="color:${color}">${title}</h1>
    <p>${message}</p>
    <a href="${SHEET_URL}" target="_blank" rel="noopener">View in Google Sheets →</a>
  </div>`);
}

function errorPage(message) {
  return baseLayout(`<div class="card">
    <div class="icon">⚠️</div>
    <h1 style="color:#DC2626">Something went wrong</h1>
    <p>${message}</p>
  </div>`);
}

// ─── Start ────────────────────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
  console.log(`\n🛒  Purchasing Request App`);
  console.log(`    Local:   http://localhost:${PORT}`);
  console.log(`    Sheets:  ${SHEET_URL}\n`);
});
