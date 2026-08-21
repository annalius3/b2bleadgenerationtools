# b2bleadgenerationtools.com

Production-ready Next.js App Router project for an English SEO authority site focused on B2B lead generation with Apollo-first workflows.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Structured content in repo (`src/lib/content.ts`)
- SSG/ISR-ready architecture (no database)
- Built-in `sitemap.xml`, `robots.txt`, and `rss.xml`

## Routes
- `/` homepage
- Intent hubs: `/find-clients`, `/outreach`, `/sales-pipeline`, `/for-startups`, `/guides`
- Business types: `/business-types` and `/business-types/[slug]`
- Guide pages: `/guides/[slug]`
- Legal/trust: `/about`, `/editorial-methodology`, `/contact`, `/privacy`, `/terms`, `/affiliate-disclosure`
- SEO feeds: `/sitemap.xml`, `/robots.txt`, `/rss.xml`

## Content model
- `src/lib/content.ts` contains:
  - `hubContent`
  - `industries` (20 industries)
  - `guides[]` (226 guides) with `slug/title/description/hub/industries/steps/useCases/tips/faqs/relatedSlugs`
- `src/lib/guide-overrides.ts` contains per-guide overrides for top-priority pages

## Local setup
1. Install dependencies:
```bash
npm install
```
2. Create env file:
```bash
cp .env.example .env.local
```
3. Start dev server:
```bash
npm run dev
```
4. Validate:
```bash
npm run lint
npm run build
```

## Environment variables
- `NEXT_PUBLIC_SITE_URL` (recommended: `https://www.b2bleadgenerationtools.com`)
- `NEXT_PUBLIC_GA_ID` (optional, GA4 Measurement ID)
- `CONVERTKIT_API_KEY` (required for production newsletter)
- `CONVERTKIT_FORM_ID` (required for production newsletter)

## Newsletter (`/api/subscribe`)
- Validates email.
- Honeypot field (`website`) for spam protection.
- In development, writes subscribers to `data/subscribers-dev.json`.
- In production, subscribes via ConvertKit API (double opt-in handled by Kit).
- Redirects with `?subscribed=1` on success or `?error=...` on failure.

## SEO implemented
- Canonical URLs via metadata
- OpenGraph + Twitter metadata (+ OG image)
- JSON-LD:
  - `WebSite` on home
  - `Organization` on all pages
  - `Article` on guide pages
  - `BreadcrumbList` on internal routes
  - `FAQPage` on guide pages with FAQs
  - `HowTo` on tutorial/playbook guides
  - `Review` on review-type guides
- `app/sitemap.ts`, `app/robots.ts`, `app/rss.xml/route.ts`

## Analytics (GA4)
- Lazy-loaded, production-only (loads only on `www.b2bleadgenerationtools.com`)
- Custom events: `newsletter_submit`, `apollo_referral_click`

## Deploy to Vercel
1. Push repository to GitHub.
2. Import project in Vercel.
3. Set env vars in Vercel Project Settings.
4. Deploy.

## Domain and DNS (Cloudflare)
- Add `b2bleadgenerationtools.com` and `www` in Vercel Domains.
- In Cloudflare DNS, point records to Vercel according to Vercel domain instructions (A/CNAME depending on setup).
- Keep proxy mode and SSL enabled in Cloudflare.

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run check:images` — validate no duplicate images
- `npm run check:interlinking` — validate all guides have ≥2 related slugs
- `npm run check:guide-hrefs` — validate no broken `/guides/` hrefs
- `npm run publish:check` — full validation pipeline (lint + build + all checks)
