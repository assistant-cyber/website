# 🛒 Purchase Request Portal

Internal tool for employees to submit product purchase requests. An AI agent searches for the best supplier, logs everything to Google Sheets, and emails the manager for approval.

---

## Features

- **Employee form** — clean, mobile-friendly SPA with inline validation
- **AI sourcing agent** — Claude + web search queries Home Depot, Grainger, Amazon Business, Lowe's, Fastenal, McMaster-Carr
- **Google Sheets logging** — all request data + sourced results logged automatically
- **Manager notification** — HTML email with one-click Approve / Reject links
- **Approval flow** — HMAC-signed tokens; updates sheet + notifies requester

---

## Quick Start

### 1. Clone / copy this folder and install dependencies

```bash
cd purchasing-app
npm install
```

### 2. Create your `.env` file

```bash
cp .env.example .env
```

Edit `.env` and fill in all values (see the comments in `.env.example`).

### 3. Set up Google Sheets access

You need a **Service Account** with Editor access to the spreadsheet.

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → Create a project (or use an existing one)
2. Enable the **Google Sheets API**
3. Create a **Service Account** → generate a JSON key
4. Download the key JSON and save it to `credentials/service-account.json`
5. In the spreadsheet, click **Share** → add the service account email with **Editor** access

Set in `.env`:
```
GOOGLE_SHEETS_CREDENTIALS=./credentials/service-account.json
```

Or inline the JSON as a single-line string:
```
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"..."}
```

### 4. Configure email (Gmail example)

For Gmail, enable **2-Step Verification** and create an [App Password](https://myaccount.google.com/apppasswords):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yourapp@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx   ← 16-char App Password
SMTP_FROM=Purchasing System <yourapp@gmail.com>
```

### 5. Start the server

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

Visit: **http://localhost:3000**

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ | Anthropic API key (claude-sonnet-4-20250514 + web search) |
| `GOOGLE_SHEETS_CREDENTIALS` | ✅ | Path to service account JSON, or inline JSON |
| `MANAGER_EMAIL` | ✅ | Email address to notify for approvals |
| `SMTP_HOST` | ✅ | SMTP server host |
| `SMTP_PORT` | ✅ | SMTP port (587 for TLS, 465 for SSL) |
| `SMTP_SECURE` | | `true` for port 465, `false` for 587 |
| `SMTP_USER` | ✅ | SMTP login username |
| `SMTP_PASS` | ✅ | SMTP password / app password |
| `SMTP_FROM` | | Friendly sender name + address |
| `PORT` | | HTTP port (default: 3000) |
| `BASE_URL` | | Public URL for approve/reject links in emails |
| `APPROVAL_SECRET` | ✅ | Random secret for HMAC token signing — **change this!** |

---

## Google Sheet Column Mapping

| Col | Field | Filled by |
|-----|-------|-----------|
| A | Timestamp | Server (on submit) |
| B | Requester Name | Form |
| C | Requester Email | Form |
| D | Project | Form |
| E | Item Description | Form |
| F | Quantity | Form |
| G | Budget Cap | Form |
| H | Search Type | Form |
| I | Preferred Supplier | Form |
| J | Needed By | Form |
| K | Priority | Form |
| L | Notes | Form |
| M | Status | Server (`Sourcing…` → `Pending Approval` → `Approved`/`Rejected`) |
| N | Sourced Product Name | AI agent |
| O | Supplier Found | AI agent |
| P | Unit Price | AI agent |
| Q | Total Price | AI agent |
| R | Product URL | AI agent |
| S | Delivery Estimate | AI agent |
| T | Approved By | Approval flow |
| U | Order Date | Approval flow |

---

## Approval Flow

When the manager receives the notification email:

1. **One-click** — click **✅ Approve** or **❌ Reject** in the email
2. The server validates the HMAC token and updates column M in the sheet
3. The requester gets a confirmation email

Tokens are stateless (HMAC-SHA256 keyed on row + manager email + `APPROVAL_SECRET`). They don't expire, so rotate `APPROVAL_SECRET` if you want to invalidate outstanding tokens.

---

## File Structure

```
purchasing-app/
├── server.js              Express app + all routes
├── src/
│   ├── agent.js           Anthropic sourcing agent (tool loop)
│   ├── sheets.js          Google Sheets read/write helpers
│   └── email.js           Nodemailer HTML emails
├── public/
│   └── index.html         Full SPA (form → loading → success)
├── credentials/
│   └── service-account.json   (not committed — add to .gitignore)
├── .env.example
├── package.json
└── README.md
```

---

## Notes

- The AI agent uses `claude-sonnet-4-20250514` with Anthropic's built-in `web_search_20250305` tool. Web search must be enabled on your API account.
- Agent calls can take 30–60 seconds when performing live web searches.
- If the AI agent fails, the request is still logged to Sheets with a fallback result so nothing is lost.
- The `credentials/` folder is listed in `.gitignore` by default — never commit service account keys.
