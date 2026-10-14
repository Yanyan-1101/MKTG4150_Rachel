# ScholarReady — Implementation & Design Plan

## Product and architecture

**Positioning:** An undergraduate scholarship-preparation workspace that turns eligibility criteria into understandable matches, organized evidence, and actionable next steps.

Build a desktop-first Next.js App Router site with TypeScript, React 19, and Tailwind CSS 4. The App Router renders the public landing page, local-demo account entry points, and the scholarship-preparation workspace. Shared client state lives in `AppProvider`; no hosted authentication, application server, or managed database is required for the agreed scope.

Use versioned browser `localStorage` as the persistence layer. Model `User`, `StudentProfile`, `Scholarship`, `EvidenceItem`, and scholarship-linked `Checklist` records with shared TypeScript interfaces. On first visit, seed a fictional student, profile, varied illustrative scholarships, evidence metadata, and preparation tasks. Validate saved JSON and its cross-record relationships before accepting it; recover safely from unavailable, malformed, or older data. Keep user-owned evidence/checklists scoped to the active local account. Explain qualification rule-by-rule, distinguishing passed criteria, failed criteria, and missing profile information. Calculate readiness from profile completeness, evidence, and checklist work; order deadline views chronologically.

The evidence tracker stores descriptions and evidence status only—not document bytes. The login/signup screens manage a clearly labeled demo session in this browser, not verified production identities. The user explicitly chose a browser-local checkout simulation for pricing; do not configure Stripe, collect card data, or describe an actual payment or subscription. This bounds the first release to local behavior and avoids implying durable payment fulfillment.

### Project structure

- `app/` — Next.js routes for `/`, `/login`, `/signup`, `/dashboard`, `/profile`, `/matches`, `/comparison`, `/evidence`, `/checklist`, `/deadlines`, and `/pricing`; root metadata, site-wide CSS, and the installable-web-app manifest.
- `components/` — the workspace/public shell, context provider, shared scholarship and deadline UI, and accessible modal focus management.
- `lib/` — fictional scholarship/demo seeds, typed local storage validation/mutations, transparent eligibility evaluation, and readiness calculations.
- `types/` — relational application and eligibility domain types.
- `public/` — the ScholarReady mark and a static page-route manifest for discovery.
- Root configuration — pinned package lock, TypeScript/Next.js/Tailwind/PostCSS configuration, static export settings, brand metadata, deployment/readme documentation, and source-aligned checklists.

**Runtime and deployment:** Configure Next.js `output: "export"` and `trailingSlash: true` so the standard `npm run build` generates the self-contained `out/` website with directory-style static page routes. The managed build contract runs `npm ci && npm run build` and publishes `out/`; retain the Vercel-compatible Next.js static export. Keep client-facing resource paths relative. Do not place credentials in source, enable a backend power-up, or introduce a remote data dependency. Use the static `public/manus-routes.json` file for the exact website page routes (not APIs, assets, or the 404 route).

## Design system

**Design movement:** Editorial academic publishing with a modern, restrained field-notebook sensibility—more like a well-edited student research journal than an institutional portal.

**Core principles:** (1) Trust through plain-language disclosure. (2) Explainability before automation. (3) Calm information density that makes a next action obvious. (4) Student-owned privacy and reversible local edits.

**Color philosophy:** A soft paper canvas and white work surfaces create legibility without sterile blue. Ink-green typography feels steady and scholarly; evergreen `#17675b` is the ownable action color, used for links and positive progress. Restrained amber flags approaching dates, while rose indicates a failed eligibility condition. Text remains dark and high contrast, with hue reinforced by labels and icons rather than carrying meaning alone.

**Layout paradigm:** A persistent left workspace rail and quiet top bar establish orientation; the content region is asymmetrical and task-led, with focused dashboards, match cards, comparison tables, and chronological deadline groupings instead of an undifferentiated centralized tile grid. Public pages use a more open editorial landing-page composition, then hand off to the compact workspace shell.

**Signature elements:** A folded-page ScholarReady emblem with an evergreen accent; small uppercase section markers with fine rules that borrow from printed annotations; and date/countdown chips that translate a deadline into a clear human time horizon.

**Interaction philosophy:** Keep eligibility reasons, privacy language, and changes visible at the point of action. Use direct labels, concise helper text, clear empty states, explicit compare/checklist actions, and a confirmation before reset. Keyboard access includes strong focus rings, contained/escapable dialogs, Escape-to-close, and focus restoration.

**Animation:** Use only short, low-amplitude hover/focus transitions to clarify state (roughly 140–350 ms); no animation is needed to understand score, eligibility, or urgency. Honor `prefers-reduced-motion` and do not add parallax or attention-demanding motion.

**Typography:** Inter through a local/system sans-serif fallback carries navigation, form controls, labels, and body text. Georgia (with Times as fallback) supplies an editorial serif for display headlines, scholarship titles, and award figures. Hierarchy relies on size and spacing as well as weight; dense metadata remains readable rather than microprint.

**Brand essence:** “ScholarReady helps undergraduates move from scholarship possibility to a prepared application—with the why and next step in view.” Personality: thoughtful, steady, encouraging.

**Brand voice:** Specific and supportive, without promises of awards. Headlines and action labels make one next step feel manageable. Example lines: “Your next opportunity, within reach.” and “A good fit is a good start.”

**Wordmark and mark:** Use a custom folded-page/bookleaf symbol with a small forward notch to evoke both reading eligibility criteria and preparing an application; pair it with a compact ScholarReady wordmark and an evergreen-highlighted “Ready” accent. The SVG favicon and workspace mark are authored locally.

**Signature brand color:** Evergreen `#17675b`.
