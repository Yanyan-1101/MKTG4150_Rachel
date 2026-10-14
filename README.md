# ScholarReady

A local-first scholarship eligibility, evidence organization, and application-preparation workspace for undergraduate students. Built with Next.js App Router, TypeScript, Tailwind CSS, and browser `localStorage`.

## Run locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`. `npm run build` creates the static site in `out/`; `npm run typecheck` checks TypeScript without emitting files.

## What is included

The application includes a public landing page with a PICS (Privacy, Information, Control, Security) privacy statement; local demo login/signup; a seeded student dashboard; profile builder; explainable scholarship matches; side-by-side comparison; evidence metadata tracker; scholarship-specific checklists; chronological deadlines; and Free, Seasonal Premium, and Institutional pricing concepts.

The initial workspace contains fictional illustrative scholarship opportunities and a demo student profile. All scholarship amounts and deadlines are sample content and must not be treated as official. Use the listed routes in `public/manus-routes.json` as the product page manifest.

## Local state and privacy

Users, student profiles, scholarship records, evidence metadata, and application tasks use typed relational models in `types/index.ts`. The state layer in `lib/storage.ts` validates saved records and stores them under a versioned browser-local storage key. Demo document entries describe materials only; files are not uploaded or retained. Browser local storage is not an encrypted vault, is limited to this browser/device, and can be cleared through browser settings. The demo auth pages create local sessions; they do not verify identity or store passwords.

Use the **Reset demo workspace** action from the dashboard to restore the seeded data. Do not enter sensitive records into the demo.

## Checkout scope

The pricing page intentionally provides a **local test/demo checkout simulation only**. It neither connects to Stripe nor processes a charge, collects card information, grants an entitlement, or creates a subscription. This scope was confirmed by the user. A genuine Stripe Checkout flow is intentionally not enabled.

## Deployment

Next.js is configured with static export and trailing-slash routes. `npm run build` writes a deployable static website to `out/`. The managed static publish command is `npm ci && npm run build`, with `out` as the output directory. The same Next.js static export is compatible with Vercel; the local-first demo requires no private environment variables.
