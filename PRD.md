# ScholarReady — Product Requirements Document

**Product:** ScholarReady
**Audience:** Undergraduate students preparing scholarship applications
**Document status:** Implementation baseline

## 1. Product vision

ScholarReady is a scholarship eligibility, evidence organization, and application-preparation workspace. It helps undergraduate students discover relevant scholarships, understand why they do or do not qualify, organize supporting evidence, and keep application deadlines visible. The first-run experience must feel complete through fictional but realistic scholarship records and a student demo profile.

## 2. Goals and non-goals

### Goals
- Explain each scholarship match using understandable eligibility rules, not an unexplained opaque score.
- Help students turn opportunities into concrete, trackable preparation steps.
- Make evidence and deadlines reusable across scholarship applications.
- Provide a complete, immediately explorable desktop-first application using reliable browser-local data.
- Establish a calm, credible, accessible academic design.

### Non-goals / explicit boundaries
- Scholarship records in the seed dataset are fictional and must be labeled as illustrative; they are not official offers or legal/financial eligibility determinations.
- Browser-local demo authentication is not production identity verification and does not sync across devices.
- Do not collect or upload real supporting-document contents in this local demo; evidence records may describe a document, its status, and linked scholarships.
- The user chose to keep the workspace browser-local and the pricing checkout a transparent client-side test/demo simulation, not a real Stripe transaction. Do not enable Stripe, collect payment-card data, or imply a subscription was charged. A future genuine Stripe Checkout would require explicit scope change to add a server, configured test integration/secrets, and durable fulfillment/entitlement handling.

## 3. Personas and primary journeys

### Primary persona: undergraduate applicant
A student wants to identify suitable scholarships, understand gaps in their profile, prepare materials, and submit complete applications on time.

### Primary journeys
1. Visit the landing page, review privacy practices, and open the demo workspace or local signup.
2. Review seeded profile and scholarship matches; inspect qualified, missing-information, and disqualified eligibility criteria.
3. Improve the profile, add/link evidence, and work through scholarship-specific checklist tasks.
4. Compare opportunities and prioritize by award, fit, requirements, and deadline.
5. Monitor upcoming deadlines and readiness on the dashboard.
6. Inspect pricing tiers and try a clearly labeled non-payment test checkout demonstration.

## 4. Information architecture

Required page routes:
- `/` — marketing landing page and PICS privacy notice.
- `/login` and `/signup` — local demo sign-in and account creation.
- `/dashboard` — readiness, action priorities, matches, and deadline countdowns.
- `/profile` — academic, demographic, financial, extracurricular, and study-related profile fields.
- `/matches` — match results with rule-by-rule explanations and filters.
- `/comparison` — side-by-side comparison of selected scholarships.
- `/evidence` — evidence records, status, scholarship links, and evidence needs.
- `/checklist` — scholarship-specific application tasks and completion state.
- `/deadlines` — chronological upcoming deadline list/calendar-style timeline.
- `/pricing` — Free, Seasonal Premium, and Institutional plan cards plus test checkout simulation.

The authenticated workspace shell should provide consistent navigation to all workspace routes, clear active-page states, a useful profile/readiness summary, and a way to return to the public landing page. Navigation remains usable at desktop widths and collapses gracefully on smaller screens.

## 5. Functional requirements

### 5.1 Local session and persistence
- Initialize a coherent seeded demo state on first load; never overwrite an existing valid user state on normal startup.
- Provide typed records for `User`, `StudentProfile`, `Scholarship`, `EvidenceItem`, and `Checklist` (including checklist tasks).
- Persist mutable data in browser-local storage through a versioned, validated storage layer with safe parse/migration/fallback behavior.
- Support profile edits, evidence creation/status/link updates, checklist completion, selected/comparison opportunities, and local session changes.
- Offer a reset-to-demo affordance with a clear confirmation/undo-friendly interaction where practical.
- Avoid external services and network dependencies for core workspace behavior.

### 5.2 Eligibility and matching
- Define scholarship requirements as explicit typed rules over profile fields, such as GPA minimum, year of study, major/field, residency, financial need, citizenship, activity/essay requirements, and deadline.
- Classify each scholarship as **Qualified**, **Needs information**, or **Not eligible**. Missing profile values are not treated as failures; report them as missing information.
- Explain each evaluated rule in human language with actual values when present and a specific missing-data or unmet-requirement reason when absent.
- Show an understandable overall match/readiness indicator, but do not claim a guaranteed award or binding eligibility decision.

### 5.3 Readiness and deadlines
- Calculate a readiness score from explicit factors such as profile completeness, relevant evidence availability, and checklist completion; display the components or next best actions so it is actionable.
- Use consistent local-date calculations for deadline countdowns; visually prioritize imminent dates without relying on color alone.
- Sort the deadlines page chronologically and indicate status (upcoming, urgent, due today, or past/closed).

### 5.4 Evidence and checklist
- Evidence records include title/type, verification or preparation status, date/expiry where appropriate, and links to relevant scholarship requirement identifiers.
- Users can add/edit/remove evidence metadata and mark it as ready, in progress, or needing renewal.
- Checklists are associated with scholarships and contain meaningful seeded tasks; users can toggle tasks and see progress at both scholarship and workspace levels.

### 5.5 Comparison
- Let users compare multiple scholarships in parallel in a readable table with scholarship name, award range, deadline, eligibility status/fit, study/field, requirements, evidence gaps, and application effort or duration where seeded.
- Keep row/column labels accessible and support horizontal scrolling at narrower viewport sizes.

### 5.6 Pricing and test checkout
- Present three tiers named **Free**, **Seasonal Premium**, and **Institutional**, with understandable included capabilities and pricing language.
- Provide a test/demo checkout interaction from the plan CTA; clearly disclose that the action is a local simulation and does not process payment, start a real subscription, or collect card details.
- Do not embed Stripe keys or claim a real Stripe transaction when integration and server are not configured.

## 6. Seed content

Provide several (at least eight) varied fictional opportunities with realistic award amounts, deadlines, fields of study, minimum/desired criteria, essay/reference/evidence requirements, and descriptions. Cover STEM, arts/humanities, community impact, first-generation, financial need, leadership, regional, and broadly eligible opportunities. Clearly mark every record as fictional/illustrative. Include a plausible undergraduate demo user and linked profile, evidence, and checklists so dashboard and matching views have meaningful data immediately.

## 7. Data model (conceptual)

- **User:** id, display name, email label, created/updated timestamps, local-demo account metadata.
- **StudentProfile:** id, userId, graduation year/current year, GPA, intended/current major, residency, citizenship/eligibility fields, financial-need indicators, activities/leadership, academic interests, completeness metadata.
- **Scholarship:** id, title, fictional sponsor, award low/high and currency, deadline, field/category, description, eligibility rules, requirements/evidence references, effort estimate, application URL placeholder only if useful.
- **EvidenceItem:** id, userId, title, evidence type, status, dates/notes, linked scholarship requirement identifiers; store metadata only, not document files.
- **Checklist:** id, userId, scholarshipId, task records (id/title/description/done/due/requirement link) and update timestamps.

All persisted identifiers and references must be stable; mutations must preserve relations and recover safely from malformed/old local state.

## 8. Design system and accessibility

- Visual direction: a considered editorial-academic workspace—calm, precise, welcoming, and contemporary rather than institutional bureaucracy.
- Use a warm light neutral canvas, ink-like dark text, and an ownable deep teal/evergreen accent with restrained amber for dates and status accents; never use hue as the sole status cue.
- Use a highly legible sans-serif UI face paired with a restrained editorial serif display face; establish clear type hierarchy and generous whitespace.
- Favor structured workspace framing, compact but breathable information panels, typographic hierarchy, timelines, and evidence/status chips over decorative illustration.
- Aim for WCAG 2.2 AA, at least 4.5:1 contrast for normal-sized text, semantic landmarks/headings, proper labels, accessible status announcements, keyboard reachability, and conspicuous `:focus-visible` rings.
- Honor reduced-motion preferences; animation should be brief, purposeful, and never necessary to understand state.

## 9. Privacy, safety, and trust

Use a plain-language PICS privacy notice (Privacy, Information, Control, Security) describing that demo records stay in this browser, users control/reset local data, the demo does not upload evidence documents, and local browser storage is not an encrypted vault or a substitute for secure document storage. Do not imply server backup, encryption at rest, or institutional review that the application does not provide. Clearly label fictional scholarships and simulated payments.

## 10. Technology and deployment

- Next.js App Router and TypeScript; Tailwind CSS for styling.
- Browser-only persistence behind typed client-side services; server rendering must not assume `window`/localStorage exists.
- No managed server/database requested; no credentials or secrets in source.
- Keep build/deployment setup compatible with Vercel using Next.js static export; `npm ci && npm run build` must emit a deployable `out/` directory and pass without TypeScript errors.
- Avoid requiring external assets/services for core functionality; use local CSS/SVG assets and installed/web-safe fonts with sensible fallbacks.

## 11. Success criteria

The requested route set is present and navigable; a first-time visitor sees an informative landing page and the seeded workspace is immediately usable. Student changes persist locally after refresh, eligibility outcomes are explainable and distinguish missing data from disqualification, and evidence/checklist/deadline actions update the experience consistently. The pricing test flow is unmistakably simulated. Core screens maintain the specified academic visual language and keyboard accessibility. Production build completes cleanly.
