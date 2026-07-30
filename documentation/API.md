# API — Scope360 Website

One route handler. No authentication; it is a public contact endpoint protected by validation and a honeypot field.

## `POST /api/contact`

Runtime: Node.js. Rendering: `force-dynamic`.

### Request
`Content-Type: application/json`

| Field | Type | Required | Constraints |
| --- | --- | --- | --- |
| `name` | string | Yes | Trimmed, 2–120 characters |
| `email` | string | Yes | Trimmed, ≤200 characters, must match `local@domain.tld` |
| `brief` | string | Yes | Trimmed, 20–4000 characters |
| `organization` | string | No | Trimmed, ≤160 characters |
| `interest` | string | No | Trimmed, ≤120 characters |
| `company_website` | string | No | Honeypot. Must be empty; any value rejects the request |

```json
{
  "name": "Anik Roy",
  "email": "anik@example.com",
  "organization": "Example Group",
  "interest": "Digital Transformation 360°",
  "brief": "Citywide exhibition delivery in Q4 including ticketing and access control."
}
```

### Responses

| Status | Body | Meaning |
| --- | --- | --- |
| `200` | `{ "ok": true }` | Accepted and delivered (or logged, if delivery is unconfigured) |
| `400` | `{ "ok": false, "error": string }` | Invalid JSON, failed validation, or honeypot triggered |
| `502` | `{ "ok": false, "error": string }` | Email provider rejected the send |

Error strings are safe to display to end users. Provider details are logged server-side only and never returned in the response.

### Delivery behaviour
When `RESEND_API_KEY`, `CONTACT_INBOX_EMAIL`, and `CONTACT_FROM_EMAIL` are all present, the handler posts to `https://api.resend.com/emails` with the submitter's address as `reply_to`. When any is missing, the enquiry is logged at info level (name, email, interest only) and `200` is returned.

## Generated routes
| Path | Description |
| --- | --- |
| `/sitemap.xml` | Generated from the navigation list in `lib/content.ts` |
| `/robots.txt` | Allows all crawlers, disallows `/api/` |
