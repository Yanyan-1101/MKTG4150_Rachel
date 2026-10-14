# ScholarReady — Task List

All product outcomes below are implemented for the approved browser-local scope. The user chose to keep the pricing flow a local simulation rather than enable a payment server/database.

## Scope and foundations
- [x] **PRD and delivery documentation** — Write comprehensive `PRD.md` and `tasklist.md` in the project root matching the ScholarReady specifications; track implementation in `TODO.md`.
- [x] **Typed local-first architecture** — Build using Next.js App Router, TypeScript, and Tailwind CSS. Use robust browser-local storage and typed relational models for Users, StudentProfiles, Scholarships, EvidenceItems, and Checklists; avoid external server crashes.
- [x] **Rich demo dataset** — Pre-populate the app with rich, realistic fictional scholarship records and student demo data so evaluators experience a fully functional app instantly.
- [x] **Vercel readiness and secrets hygiene** — Prepare the project for seamless Vercel deployment and include zero hardcoded secrets.

## Routes and user-facing behavior
- [x] **Landing page `/`** — Marketing landing page with trust-building design and PICS (Privacy, Information, Control, Security) privacy disclaimer.
- [x] **Authentication `/login`, `/signup`** — Provide both auth pages and support a demo local user session; keep user state browser-local and do not depend on an external authentication server.
- [x] **Dashboard `/dashboard`** — Personal dashboard with readiness score and deadline countdowns.
- [x] **Profile `/profile`** — Profile builder for undergraduate academic, demographic, financial, extracurricular, and study-related details used in eligibility logic.
- [x] **Matches `/matches`** — Scholarship matching view with clear eligibility explanation logic, including qualified, unqualified, and missing-information states.
- [x] **Comparison `/comparison`** — Side-by-side scholarship comparison table for eligibility, award details, requirements, evidence, and deadlines.
- [x] **Evidence `/evidence`** — Evidence tracker for organizing proof, linking relevant scholarship requirements, and monitoring evidence readiness; sensitive document contents are not uploaded.
- [x] **Checklist `/checklist`** — Application checklist to track scholarship-specific preparation tasks and completion. Students can start a personalized, requirement-linked checklist from a match.
- [x] **Deadlines `/deadlines`** — Chronological deadline view.
- [x] **Pricing `/pricing`** — Show Free, Seasonal Premium, and Institutional tiers, with a clear, non-charging local checkout simulation. Per the user's decision, no real Stripe API, payment server, durable payment database, card collection, or transaction is configured.

## Product quality
- [x] **Trustworthy visual system** — Clean academic design, desktop-first layout, calm neutral palette, high-contrast typography, and a consistent interface across the specified pages.
- [x] **WCAG 2.2 AA interaction basics** — At least 4.5:1 contrast for text, visible focus rings, and keyboard-managed dialogs.
- [x] **Build discipline** — Follow single-task execution and ensure `npm run build` passes with zero TypeScript errors; verified with the production build and standalone TypeScript check.
