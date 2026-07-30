# Changelog

## [2026-07-31] — Next.js 16 upgrade

- Upgraded Next.js 15.5.4 → 16.2.12 and React 19.1.1 → 19.2.8. Vercel refused to deploy the 15.5.4 build with `Vulnerable version of Next.js detected`; the build itself had succeeded.
- No application code changes were required. `tsconfig.json` `jsx` was set to `react-jsx` automatically by the Next 16 build.
- Re-verified: production build clean, all six pages screenshot-identical at 1440px and 390px, zero horizontal overflow, no console or page errors, contact API validation paths unchanged.

## [2026-07-31] — Initial build

- Scaffolded the Scope360 company website: Next.js 15 App Router, React 19, TypeScript strict mode, Tailwind CSS v4.
- Established the brand design system from the Scope360 logo — near-black surfaces (`#060606`) with the amber accent (`#F5B42A`), Inter typography, fluid display scale.
- Built six routes: home, capabilities, approach, industries, about, and contact.
- Modelled all copy on the official company profile (three 360° pillars, Align/Architect/Execute/Optimize methodology, governance and compliance stance) in a single typed content module at `lib/content.ts`.
- Added the contact API route with strict validation, a honeypot, and optional Resend delivery that degrades to logging when unconfigured.
- Added SEO fundamentals: per-page metadata, Open Graph and Twitter cards, Organization JSON-LD, generated `sitemap.xml` and `robots.txt`.
- Accessibility: skip link, labelled form fields, `aria-current` navigation state, live status region, visible focus rings, reduced-motion support.
- Security headers configured in `next.config.ts`; `.gitignore` covers `.env*`, keys, and certificates before the first commit.
- Generated `logo.png`, `logo-light.png`, and `icon.png` from the source brand artwork.
- Verified: production build clean, six pages screenshot-tested at 1440px and 390px with zero horizontal overflow, contact API validation paths exercised.
