# b2bleadgenerationtools.com

Production-ready Next.js App Router project for an English SEO blog focused on B2B lead generation software.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- MDX content in repo (`src/content/posts/*.mdx`)
- JSON tool data in repo (`src/content/tools/*.json`)
- SSG/ISR-ready architecture (no database)
- Built-in `sitemap.xml`, `robots.txt`, and `rss.xml`

## Routes
- `/` homepage
- `/best`
- `/categories/[slug]`
- `/tags/[slug]`
- `/tools`
- `/tool/[slug]`
- `/blog`
- `/blog/page/[page]`
- `/blog/[slug]`
- `/comparisons`
- `/comparisons/[slug]`
- `/about`, `/contact`, `/privacy`, `/terms`, `/affiliate-disclosure`

## Content model
### MDX frontmatter
Each post uses:
- `title`, `description`, `date`, `updated`, `author`, `category`
- `tags[]`, `ogImage?`, `toolSlug?`, `comparisonSlugs?`, `affiliateDisclaimer?`

### Tool data
Each tool JSON uses:
- `name`, `slug`, `tagline`, `websiteUrl`, `pricingTier`
- `bestFor[]`, `toolType[]`, `pros[]`, `cons[]`, `alternatives[]`
- `rating?`, `affiliateUrl?`, `lastReviewed`

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
- In development, appends subscribers to `data/subscribers.txt`.
- In production, returns success response (safe placeholder).

### Contact (`/api/contact`)
- Validates name/email/message.
- Honeypot field (`companyWebsite`) blocks basic bots.

## Integrating ConvertKit or Beehiiv later
Replace logic in `app/api/subscribe/route.ts`:
1. Keep current email validation.
2. Add provider API call using server-side secret env vars.
3. Return provider error or success payload.

## SEO implemented
- Canonical URLs via metadata
- OpenGraph + Twitter metadata
- JSON-LD:
  - `Article` on blog post pages
  - `SoftwareApplication` on tool pages
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
