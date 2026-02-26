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
- Industry hub: `/by-industry` and `/by-industry/[slug]`
- Guide pages: `/guides/[slug]`
- Legal/contact: `/contact`, `/privacy`, `/terms`, `/affiliate-disclosure`
- SEO feeds: `/sitemap.xml`, `/robots.txt`, `/rss.xml`

## Content model
- `src/lib/content.ts` contains:
  - `hubContent`
  - `industries`
  - `guides[]` with `slug/title/description/hub/industries/steps/useCases/tips/faqs/relatedSlugs`

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
- `NEXT_PUBLIC_SITE_URL` (recommended: `https://b2bleadgenerationtools.com`)
- `NEXT_PUBLIC_GA_ID` (optional, GA4 Measurement ID)

## Forms
### Newsletter (`/api/subscribe`)
- Validates email.
- In development, writes subscribers to `data/subscribers-dev.json`.
- In production, returns success response (placeholder for provider integration).

### Contact (`/api/contact`)
- Validates `name/email/message`.
- Honeypot field: `website` (hidden input).
- Returns mock success payload.

## Integrating ConvertKit or Beehiiv later
Replace logic in `app/api/subscribe/route.ts`:
1. Keep current email validation.
2. Add provider API call using server-side secret env vars.
3. Return provider error or success payload.

## SEO implemented
- Canonical URLs via metadata
- OpenGraph + Twitter metadata (+ OG image)
- JSON-LD:
  - `WebSite` on home
  - `Article` on guide pages
  - `BreadcrumbList` on internal routes
- `app/sitemap.ts`, `app/robots.ts`, `app/rss.xml/route.ts`

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
- `npm run check:images`
- `npm run check:interlinking`
- `npm run publish:check`
