# Changelog

## [2026-07-31] — Motion layer, custom domain, contact delivery

- Added an xAI-inspired motion system: `components/motion.tsx` (scroll `Reveal` with five variants, `Stagger`, `CountUp`, `ScrambleText`) and `components/effects.tsx` (`ScrollProgress`, `CursorSpotlight`, `GridBackdrop`, `Marquee`, `SpotlightCard`, `MagneticButton`).
- Hero headlines now wipe up line-by-line behind their own masks, with an animated gradient sheen on the accent line and a decoding eyebrow.
- Motion was placed inside the shared `SectionHeading`/`Card`/`ButtonLink` primitives so every page inherits it without per-page markup changes.
- All motion is transform/opacity only, driven by IntersectionObserver and rAF, and fully disabled under `prefers-reduced-motion`. `CursorSpotlight` additionally requires a fine pointer.
- Fixed horizontal overflow introduced by the horizontal reveal variants by setting `overflow-x: clip` on `html` and `body` — `clip` rather than `hidden` so the fixed header is unaffected.
- Attached `scope360bd.com` and `www.scope360bd.com` to the Vercel project; set `NEXT_PUBLIC_SITE_URL` accordingly.
- Configured Resend delivery for the contact form across production, preview, and development.
- Verified: build clean, typecheck passes, all six pages scrolled end-to-end with zero elements stuck hidden, zero horizontal overflow at 390px, no console or page errors.

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
