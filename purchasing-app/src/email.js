'use strict';

const nodemailer = require('nodemailer');

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1DolSihbqo2G4_YgtnWnqYllOfwZJdtdvKTY5wf0vrqQ/edit';

// ─── Transport ────────────────────────────────────────────────────────────

function createTransport() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ─── Shared HTML helpers ──────────────────────────────────────────────────

const BASE_CSS = `
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
           background: #F7F8FA; color: #111827; }
    .wrap  { max-width: 620px; margin: 0 auto; padding: 24px 16px; }
    .card  { background: #fff; border-radius: 12px; overflow: hidden;
             box-shadow: 0 1px 4px rgba(0,0,0,.08), 0 0 0 1px #E5E7EB; }
    .hdr   { padding: 28px 32px; color: #fff; }
    .hdr h1 { font-size: 20px; font-weight: 700; line-height: 1.3; }
    .hdr p  { margin-top: 4px; font-size: 14px; opacity: .85; }
    .body  { padding: 32px; }
    .sec-title { font-size: 11px; font-weight: 700; letter-spacing: .08em;
                 text-transform: uppercase; color: #6B7280; margin-bottom: 14px; }
    .row   { display: flex; align-items: flex-start; margin-bottom: 9px; }
    .lbl   { width: 140px; flex-shrink: 0; font-size: 13px; color: #6B7280; padding-top: 1px; }
    .val   { font-size: 14px; color: #111827; font-weight: 500; }
    .divider { height: 1px; background: #F3F4F6; margin: 24px 0; }
    .product-box { background: #F9FAFB; border: 1px solid #E5E7EB;
                   border-radius: 10px; padding: 20px 24px; }
    .p-name { font-size: 17px; font-weight: 700; margin-bottom: 2px; }
    .p-sup  { font-size: 13px; color: #6B7280; margin-bottom: 16px; }
    .prices { display: flex; gap: 28px; margin-bottom: 14px; }
    .price-block .pl { font-size: 11px; text-transform: uppercase;
                       letter-spacing: .07em; color: #6B7280; }
    .price-block .pv { font-size: 24px; font-weight: 800; color: #1D9E75; }
    .pill  { display: inline-block; padding: 2px 10px; border-radius: 99px;
             font-size: 12px; font-weight: 600; }
    .pill-urgent { background: #FEE2E2; color: #DC2626; }
    .pill-normal { background: #DBEAFE; color: #2563EB; }
    .pill-low    { background: #F3F4F6; color: #6B7280; }
    .actions { display: flex; gap: 12px; margin-top: 28px; }
    .btn { display: block; flex: 1; text-align: center; padding: 14px 20px;
           border-radius: 8px; font-size: 15px; font-weight: 600;
           text-decoration: none; }
    .btn-approve { background: #1D9E75; color: #fff; }
    .btn-reject  { background: #FEE2E2; color: #DC2626; }
    .footer { text-align: center; font-size: 12px; color: #9CA3AF; margin-top: 20px; }
    a { color: #1D9E75; }
  </style>`;

// ─── Manager notification ─────────────────────────────────────────────────

async function sendManagerNotification(form, result, rowNumber, token, baseUrl) {
  const transport   = createTransport();
  const approveUrl  = `${baseUrl}/approve?row=${rowNumber}&token=${token}`;
  const rejectUrl   = `${baseUrl}/reject?row=${rowNumber}&token=${token}`;
  const requester   = [form.firstName, form.lastName].filter(Boolean).join(' ') || 'Unknown';

  const subject = `Purchase request — ${form.itemDescription} (qty ${form.quantity}) | Awaiting approval`;

  // ── Plain-text fallback ──
  const text = `
A new purchase request has been sourced and is awaiting your approval.

REQUEST DETAILS
───────────────────────────────
Requester : ${requester}
Project   : ${form.project || 'Not specified'}
Item      : ${form.itemDescription}
Quantity  : ${form.quantity}
Needed by : ${form.neededBy || 'Not specified'}

SOURCED PRODUCT
───────────────────────────────
Product   : ${result.sourced_product_name}
Supplier  : ${result.supplier}
Unit price: ${result.unit_price}
Total cost: ${result.total_price}
Delivery  : ${result.delivery_estimate}
URL       : ${result.product_url}${result.notes ? `\nNotes     : ${result.notes}` : ''}

───────────────────────────────
View in Google Sheets: ${SHEET_URL}

✅ APPROVE: ${approveUrl}
❌ REJECT : ${rejectUrl}

Or reply to this email with "APPROVED" to approve.
`.trim();

  // ── HTML ──
  const html = `<!DOCTYPE html><html><head>${BASE_CSS}</head><body>
<div class="wrap">
  <div class="card">
    <div class="hdr" style="background:#1D9E75;">
      <h1>Purchase Request — Awaiting Approval</h1>
      <p>${form.itemDescription} &middot; Qty ${form.quantity}${form.neededBy ? ` &middot; Needed by ${form.neededBy}` : ''}</p>
    </div>
    <div class="body">

      <p class="sec-title">Request Details</p>
      <div class="row"><span class="lbl">Requester</span><span class="val">${requester}</span></div>
      <div class="row"><span class="lbl">Project</span><span class="val">${form.project || 'Not specified'}</span></div>
      <div class="row"><span class="lbl">Item</span><span class="val">${form.itemDescription}</span></div>
      <div class="row"><span class="lbl">Quantity</span><span class="val">${form.quantity}</span></div>
      <div class="row"><span class="lbl">Needed by</span><span class="val">${form.neededBy || 'Not specified'}</span></div>

      <div class="divider"></div>

      <p class="sec-title">Sourced Product</p>
      <div class="product-box">
        <div class="p-name">${result.sourced_product_name}</div>
        <div class="p-sup">via ${result.supplier}</div>
        <div class="prices">
          <div class="price-block">
            <div class="pl">Unit Price</div>
            <div class="pv">${result.unit_price}</div>
          </div>
          <div class="price-block">
            <div class="pl">Total Cost</div>
            <div class="pv">${result.total_price}</div>
          </div>
        </div>
        <div class="row"><span class="lbl">Delivery</span><span class="val">${result.delivery_estimate}</span></div>
        <div class="row"><span class="lbl">Product link</span><span class="val"><a href="${result.product_url}">${result.product_url}</a></span></div>
        ${result.notes ? `<div class="row" style="margin-top:10px;"><span class="lbl">Agent notes</span><span class="val" style="color:#6B7280;font-style:italic;">${result.notes}</span></div>` : ''}
      </div>

      <div style="margin-top:20px;">
        <p style="font-size:13px;margin-bottom:16px;">
          <a href="${SHEET_URL}">View full request in Google Sheets →</a>
        </p>
        <div class="actions">
          <a href="${approveUrl}" class="btn btn-approve">✅&nbsp; Approve Request</a>
          <a href="${rejectUrl}"  class="btn btn-reject">❌&nbsp; Reject Request</a>
        </div>
        <p style="font-size:12px;color:#9CA3AF;margin-top:12px;text-align:center;">
          Or reply to this email with "APPROVED" to approve.
        </p>
      </div>

    </div>
  </div>
  <div class="footer">Internal purchasing system &middot; Row #${rowNumber}</div>
</div>
</body></html>`;

  await transport.sendMail({
    from:    process.env.SMTP_FROM || process.env.SMTP_USER,
    to:      process.env.MANAGER_EMAIL,
    subject,
    text,
    html,
  });
}

// ─── Module exports ────────────────────────────────────────────────────────
// Note: sendApprovalConfirmation was removed because the new Google Form does
// not collect a requester email, so the worker can no longer notify the
// requester automatically. The manager approval flow still works end-to-end.

module.exports = { sendManagerNotification };
