# Changelog

## [2026-07-31] — Digital Ecosystems name restored

- "Websites & Apps" reverted to **Digital Ecosystems** in both the capabilities list and the hero orbit, at the client's request. The plain-language description underneath is unchanged.


## [2026-07-31] — Plain-language pass across the whole site

- Removed the remaining industry jargon everywhere, not just in headlines: architecture, platform, infrastructure, ecosystem, framework, stack, deploy, integrate, orchestrate, seamless, robust, turnkey, holistic, scalable, data-driven, workflow, dashboard, multi-tenant. Verified zero occurrences in the rendered output of all six pages.
- **This required rewriting copy taken from the company deck**, which had been preserved verbatim until now. The client's original wording is in git history if any of it should be restored.
- Removed AI and automation entirely. "AI & Automation" became "Ticketing & Entry", describing work the deck actually lists (ticketing with fingerprint and tap-card readers).
- Renamed service headings in plain terms: Digital Ecosystems → Websites & Apps, Advanced Analytics → Reports & Screens, Platform Engineering → Internal Tools, Strategic Procurement → Buying & Suppliers, Asset Lifecycle Management → Equipment & Assets, Enterprise Support → Round-the-Clock Support, Field Mobilization → Field Teams.
- Renamed the three pillars: Physical Infrastructure 360° → On the Ground 360°, Digital Transformation 360° → Digital & Data 360°, Managed Services 360° → Running It 360°.
- Renamed the four delivery steps: Align, Architect, Execute, Optimize & Sustain → Agree, Plan, Build, Keep it running.
- "Governance & Compliance" became "Permits, Safety & Paperwork".
- URL slugs updated to match (`/capabilities#on-the-ground`, `#digital-and-data`, `#running-it`); anchor navigation verified working.
- Meta descriptions rewritten — the old ones still carried the jargon even where the visible page no longer did.
- Verified: 48 page/viewport combinations with no horizontal overflow and no console errors, anchors scroll correctly, and no AI or automation label remains in the hero orbit.

## [2026-07-31] — Capability orbit live on the hero

- The hero now carries a 360° instrument with the Scope360 mark at its hub and all twelve capabilities placed at their own 30° stop around the rim. A marker steps stop to stop, lighting each capability in turn.
- Ordered so each pillar owns a contiguous 120° arc: Managed Services from the top (Facility Operations at 0°), Physical Infrastructure through the bottom (Experiential Events at 180°), Digital Transformation back up the left.
- Sped the cycle up: dwell 2600ms → 1400ms, marker travel 1000ms → 620ms, label crossfade 600ms → 380ms.
- Removed the capability marquee beneath the hero — it listed the same twelve items the orbit now shows.
- Key figures (360°, 03, 24/7, M&E) moved to a row beneath the buttons. It animates on load rather than on scroll, because the row sits exactly on the fold and a scroll reveal never fired there — it was rendering at opacity 0 on a 1470x790 screen.
- Instrument width is capped per breakpoint from the space its column actually has; below `md` the rim labels are hidden and the hub names the active capability, since twelve labels cannot fit round a circle on a phone.
- Verified: 60 page/viewport combinations from 360x740 to 2560x1440 with zero horizontal overflow, zero clipped labels, both hero CTAs above the fold, and no console errors. Static under `prefers-reduced-motion`; all twelve capabilities present with JavaScript disabled.

## [2026-07-31] — Hero figures moved into the scope dial

- Removed the opaque statistics panel that sat over the dial and hid it. The four figures now cycle **inside** the instrument, one at a time, every 3.5 seconds — the dial carries the content instead of being covered by it.
- The dial's cardinal tick for the active reading extends and brightens, and an arc sweeps round to point at it, so the instrument indicates which figure is showing.
- Sized the dial to sit fully in view between the header and the fold (`min(24rem, 42vh)`), rather than bleeding off-screen and passing under the header.
- Opened the sweep's centre mask from 22% to 46% and added a lens disc behind the readings, because the rotating cone was washing out the text and making figures unreadable as it passed.
- Lifted the dial's stroke opacities now that it is the focal element rather than ambient background texture.
- Accessibility and robustness: all four readings are always in the DOM, so search engines, screen readers and non-JavaScript visitors get the complete content. Cycling only starts after hydration confirms motion is allowed; under `prefers-reduced-motion` all four render as a static list. Dot controls allow manual selection and hovering pauses the cycle.
- Verified: 60 page/viewport combinations with no horizontal overflow and no console errors; dial fully visible and clear of the header with both CTAs above the fold at all 10 desktop and tablet sizes; no-JS render confirmed to contain every reading.

## [2026-07-31] — Animated Scope360 hero mark

- Added `components/scope-dial.tsx`: an animated 360° scope dial in the hero, drawn from the logo itself — the concentric fingerprint arcs behind the wordmark and the crosshair cut through the "o" of scope, combined with a full-circle tick dial and a radar sweep.
- Composed of a 72-tick ring (marked every 5°, emphasised every 30° and 90°), four concentric arcs counter-rotating against the ring, a masked conic-gradient sweep, a pulsing core, and a marker orbiting the full 360.
- Pure SVG and CSS animation — no JavaScript runs per frame — and completely static under `prefers-reduced-motion` (verified: zero pixel difference between frames).
- Opacity scales with breakpoint (25% mobile, 35% tablet, 55% desktop) so the arcs never compete with headline legibility on small screens.
- The dial takes its positioning utility from the caller; it deliberately carries no `relative` of its own, which would otherwise win over an `absolute` passed in and drop it into normal flow.
- Verified: no horizontal overflow across 54 page/viewport combinations, hero CTAs still above the fold, animation confirmed running.

## [2026-07-31] — Above-the-fold fix, density pass, full responsive sweep

- **Fixed the hero call-to-action falling below the fold.** At a 1470x790 viewport the buttons sat 144px off-screen and the supporting paragraph was cut. The display type scale was far too large.
- Reduced the display scale from `clamp(2.8rem, 7.4vw, 6rem)` to `clamp(2.3rem, 5.3vw, 4.4rem)`, with h1 and h2 brought down proportionally.
- Hero vertical rhythm is now viewport-height aware (`clamp(1.75rem, 4.5vh, 4.5rem)`) rather than fixed, so short screens compress instead of pushing content off-screen. Added `max-height` breakpoints at 720px, 600px and 480px that shrink the display scale further.
- On landscape phones the four forced headline lines now reflow inline, recovering enough height for the call to action.
- **Rebuilt the hero as two columns.** The right half was empty; the key figures now sit there, removing both the dead space and the tall blank band beneath the buttons.
- Added a `split` heading layout that places the supporting line beside the title on wide screens, so full-width section headings no longer leave their right half empty.
- Tightened spacing throughout: section padding 20/28 to 14/20, card padding 7 to 6, grid gaps and heading gaps reduced. Home page height dropped from ~5600px to 4285px with no content removed.
- Verified: **60 page/viewport combinations** (6 pages x 10 viewports from 360x740 to 2560x1440) with zero horizontal overflow and no console errors. Both hero CTAs confirmed above the fold at 12 viewport sizes including 1280x700, 1366x650, 320x568 and 844x390 landscape.

## [2026-07-31] — Repositioning and artistic direction

- **Repositioned the site away from a software-company voice.** The two source documents conflict; the site now follows the company deck (a full-service *execution* partner) rather than the premium-profile docx (a software/AI firm). Digital is one of three pillars, not the headline.
- Replaced the engineering-only "capability stack" with an execution-led one: Field & Site Operations, Build & Fabrication, Procurement & Logistics, and Digital, Data & Support.
- Rewrote all authored copy in plain, non-technical English aimed at lay and artistic readers. Jargon such as "architecture", "platform", "delivery model", and "engagement" was removed from headlines, ledes, form labels, and API error messages. The client's own wording from the deck is preserved.
- **New artistic direction:** Instrument Serif editorial display face for headlines against Inter for body copy; warm near-black and cream palette replacing the cold greyscale; the technical grid backdrop replaced with soft painterly washes and paper grain.
- Added a no-JS safeguard: `<html>` carries `no-js`, removed by an inline script, with CSS forcing revealed elements visible. Without it, disabled or failed JavaScript left every animated element at opacity 0.
- `CountUp` now server-renders its final value and resets to zero only when it can actually animate, so no-JS output reads "03" rather than "00".
- Verified: build clean, typecheck passes, zero horizontal overflow across six pages, no console or page errors, and the page fully readable with JavaScript disabled.

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
