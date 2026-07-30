# Setup — Scope360 Website

## Stack
- Next.js 16 (App Router) — React 19, TypeScript strict
- Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js`)
- Deployment target: Vercel (zero-config; no custom server, no non-serverless dependencies)

## Local development
```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts
| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run typecheck` | TypeScript check, no emit |

## Environment variables
Copy `.env.example` to `.env.local`. None are required for the site to build or render; they only enable contact-form email delivery.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin used for metadata, `sitemap.xml`, and `robots.txt`. Defaults to `https://scope360.com`. |
| `RESEND_API_KEY` | Optional | Resend API key. Without it, enquiries are validated and logged, not emailed. |
| `CONTACT_INBOX_EMAIL` | Optional | Destination inbox for enquiries. |
| `CONTACT_FROM_EMAIL` | Optional | Verified sender address on the Resend domain. |

All three delivery variables must be set together; if any is missing the API validates the submission, logs it, and returns success.

## Deployment (Vercel)
1. Import `github.com/MusfiqurTuhin/scope360` into Vercel. Framework preset auto-detects **Next.js**; leave build and output settings at defaults.
2. Add the environment variables above under Project → Settings → Environment Variables (Production + Preview).
3. Attach the production domain and set `NEXT_PUBLIC_SITE_URL` to match it.
4. Pushes to `main` deploy to production; all other branches produce preview deployments.

## Content
All site copy lives in [`lib/content.ts`](../lib/content.ts) as typed exports. Editing that file updates the homepage, capability pages, footer, sitemap, and contact form options together. No CMS is wired up.

## Brand assets
`public/logo.png` (dark wordmark, for light backgrounds), `public/logo-light.png` (white wordmark, used site-wide on the dark theme), and `public/icon.png` (favicon) are generated from `../scope360 logo-01.png`.
