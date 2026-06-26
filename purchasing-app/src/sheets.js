'use strict';

const { google } = require('googleapis');
const path = require('path');

const SHEET_ID   = '1DolSihbqo2G4_YgtnWnqYllOfwZJdtdvKTY5wf0vrqQ';
const SHEET_NAME = 'Form responses';
const SCOPES     = ['https://www.googleapis.com/auth/spreadsheets'];

// ─── Auth ──────────────────────────────────────────────────────────────────
// Supports two modes:
//   1. OAuth2  — GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET + GOOGLE_REFRESH_TOKEN
//   2. Service account — GOOGLE_SHEETS_CREDENTIALS (file path or inline JSON)

function buildAuth() {
  // ── Mode 1: OAuth2 (gogcli / existing user token) ──
  const clientId     = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (clientId && clientSecret && refreshToken) {
    const oauth2 = new google.auth.OAuth2(clientId, clientSecret);
    oauth2.setCredentials({ refresh_token: refreshToken });
    return oauth2;
  }

  // ── Mode 2: Service account JSON ──
  const raw = process.env.GOOGLE_SHEETS_CREDENTIALS;
  if (!raw) {
    throw new Error(
      'Google auth not configured. Set GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET + GOOGLE_REFRESH_TOKEN, ' +
      'or GOOGLE_SHEETS_CREDENTIALS in .env'
    );
  }

  let credentials;
  if (raw.trim().startsWith('{')) {
    credentials = JSON.parse(raw);
  } else {
    credentials = require(path.resolve(process.cwd(), raw));
  }

  return new google.auth.GoogleAuth({ credentials, scopes: SCOPES });
}

async function getSheets() {
  const auth = buildAuth();
  return google.sheets({ version: 'v4', auth });
}

// ─── Row number extraction ─────────────────────────────────────────────────
// updatedRange looks like: "Purchasing Requests!A5:M5"  →  5

function rowFromRange(updatedRange) {
  // Strip sheet name prefix, then grab first number
  const cell = updatedRange.split('!')[1] || updatedRange;
  const m = cell.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Append a new row (columns A–H) and return the spreadsheet row number.
 *
 * Actual "Form responses" tab layout (verified via gog sheets get):
 *   A  First Name
 *   B  Last Name
 *   C  Project
 *   D  Item Description
 *   E  Quantity
 *   F  Needed By
 *   G  Submission ID   (auto-filled by Google Forms on user submission)
 *   H  Status          (worker writes here)
 */
async function appendRequest(form) {
  const sheets = await getSheets();

  const values = [[
    form.firstName || '',                // A  First Name
    form.lastName  || '',                // B  Last Name
    form.project   || '',                // C  Project
    form.itemDescription || '',          // D  Item Description
    form.quantity  || '',                // E  Quantity
    form.neededBy  || '',                // F  Needed By
    '',                                  // G  Submission ID (Google Forms auto-fills on user submit)
    'Pending',                           // H  Status — picked up by sourcing worker
  ]];

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId:   SHEET_ID,
    range:           `${SHEET_NAME}!A:H`,
    valueInputOption: 'USER_ENTERED',
    resource: { values },
  });

  const rowNumber = rowFromRange(res.data.updates.updatedRange);
  if (!rowNumber) throw new Error('Could not determine row number from Sheets response');
  return rowNumber;
}

/**
 * Update columns H–N on an existing row with the agent's results.
 *
 *   H  Status  → 'Pending Approval'
 *   I  Sourced Product Name
 *   J  Supplier Found
 *   K  Unit Price
 *   L  Total Price
 *   M  Product URL
 *   N  Delivery Estimate
 */
async function updateRowWithResults(rowNumber, result) {
  if (!rowNumber) throw new Error('Invalid row number');
  const sheets = await getSheets();

  const values = [[
    'Pending Approval',                  // H  Status
    result.sourced_product_name || '',   // I  Sourced Product Name
    result.supplier              || '',  // J  Supplier Found
    result.unit_price            || '',  // K  Unit Price
    result.total_price           || '',  // L  Total Price
    result.product_url           || '',  // M  Product URL
    result.delivery_estimate     || '',  // N  Delivery Estimate
  ]];

  await sheets.spreadsheets.values.update({
    spreadsheetId:   SHEET_ID,
    range:           `${SHEET_NAME}!H${rowNumber}:N${rowNumber}`,
    valueInputOption: 'USER_ENTERED',
    resource: { values },
  });
}

/**
 * Mark a row as Approved and stamp column O (Approved By).
 */
async function approveRow(rowNumber, approvedBy) {
  const sheets = await getSheets();
  const now = new Date().toISOString();

  // Status
  await sheets.spreadsheets.values.update({
    spreadsheetId:   SHEET_ID,
    range:           `${SHEET_NAME}!H${rowNumber}`,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [['Approved']] },
  });

  // Approved By (col O) + Order Date (col P)
  await sheets.spreadsheets.values.update({
    spreadsheetId:   SHEET_ID,
    range:           `${SHEET_NAME}!O${rowNumber}:P${rowNumber}`,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [[approvedBy, now]] },
  });
}

/**
 * Mark a row as Rejected.
 */
async function rejectRow(rowNumber) {
  const sheets = await getSheets();

  await sheets.spreadsheets.values.update({
    spreadsheetId:   SHEET_ID,
    range:           `${SHEET_NAME}!H${rowNumber}`,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [['Rejected']] },
  });
}

/**
 * Read a single row and return a structured object.
 */
async function getRowData(rowNumber) {
  const sheets = await getSheets();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range:         `${SHEET_NAME}!A${rowNumber}:P${rowNumber}`,
  });

  const row = res.data.values?.[0];
  if (!row) return null;

  return {
    firstName:          row[0]  || '',
    lastName:           row[1]  || '',
    project:            row[2]  || '',
    itemDescription:    row[3]  || '',
    quantity:           row[4]  || '',
    neededBy:           row[5]  || '',
    submissionId:       row[6]  || '',
    status:             row[7]  || '',
    sourcedProductName: row[8]  || '',
    supplier:           row[9]  || '',
    unitPrice:          row[10] || '',
    totalPrice:         row[11] || '',
    productUrl:         row[12] || '',
    deliveryEstimate:   row[13] || '',
    approvedBy:         row[14] || '',
    orderDate:          row[15] || '',
  };
}

/**
 * Return all rows where Status (col H) === 'Pending' OR is empty (new
 * Google Forms submissions leave Status blank), with their row number
 * and the form data needed to run the sourcing agent.
 */
async function getPendingRows() {
  const sheets = await getSheets();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range:         `${SHEET_NAME}!A2:P`,   // skip header row
  });

  const rows = res.data.values || [];
  const pending = [];

  rows.forEach((row, idx) => {
    const status = (row[7] || '').trim();  // col H (0-indexed = 7)
    // Accept either "Pending" (set by the app's /api/submit) or empty
    // (Google Forms submissions land in the sheet with no Status).
    // Skip anything already in flight or decided.
    if (status === 'Pending' || status === '' || status === 'Sourcing...') {
      pending.push({
        rowNumber: idx + 2,                 // +1 for 0-index, +1 for skipped header
        form: {
          firstName:       row[0] || '',
          lastName:        row[1] || '',
          project:         row[2] || '',
          itemDescription: row[3] || '',
          quantity:        row[4] || '',
          neededBy:        row[5] || '',
          submissionId:    row[6] || '',
        },
      });
    }
  });

  return pending;
}

/**
 * Flip a row's Status to "Sourcing..." so a concurrent worker won't double-process it.
 */
async function markAsSourcing(rowNumber) {
  const sheets = await getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId:   SHEET_ID,
    range:           `${SHEET_NAME}!H${rowNumber}`,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [['Sourcing...']] },
  });
}

module.exports = { appendRequest, updateRowWithResults, approveRow, rejectRow, getRowData, getPendingRows, markAsSourcing };
