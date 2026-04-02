# Production Checklist

This checklist tracks what is already handled in the codebase and what still requires external verification before and after release.

## Already handled in code

### Routing and indexing
- Canonical domain set to `https://www.b2bleadgenerationtools.com`
- `sitemap.xml`, `robots.txt`, and `rss.xml` implemented
- Old `by-industry` URLs redirected to canonical `business-types` routes
- Broken legacy slug redirect added for `startup-outbound-kpi-dashboar`
- Search results live on `/guides/search` and are marked `noindex`

### Performance
- Homepage and most hubs are static
- Header is a server component
- TOC is static
- Newsletter form is no-JS
- GA4 loads lazily and only on production host
- Generic hub images removed where they were not adding value
- Decorative homepage images replaced with lightweight content panels
- JPEG assets recompressed with `scripts/optimize-jpegs.ps1`
- Below-the-fold sections use `content-visibility` where appropriate
- Large card grids disable unnecessary link prefetch

### SEO and schema
- Canonicals, OpenGraph, and Twitter metadata implemented
- `WebSite`, `Organization`, `BreadcrumbList`, `Article`, `FAQPage`, `HowTo`, and `Review` schema used where relevant
- RSS route implemented
- Internal linking validation script implemented
- Exact duplicate image check implemented

### Legal and trust pages
- `Privacy Policy`
- `Terms of Use`
- `Affiliate Disclosure`
- `Editorial Methodology`
- `About`
- `Contact`

## Still requires manual or external verification

### Search Console
- Re-submit `https://www.b2bleadgenerationtools.com/sitemap.xml`
- Inspect coverage issues
- Re-check canonical selection
- Request indexing for homepage and top commercial pages
- Monitor `Discovered - currently not indexed`

### Real browser/device testing
- iPhone Safari
- Android Chrome
- Desktop Chrome
- Desktop Firefox
- Desktop Edge

### Real performance testing
- Run Lighthouse on production homepage
- Run Lighthouse on one guide page
- Check Core Web Vitals in production analytics
- Validate there are no CLS issues on slow mobile connections

### Content quality
- Manually upgrade top money pages with:
  - product screenshots
  - stronger examples
  - more unique editorial details
  - fresher pricing/product verification
- Prioritize:
  - `apollo-io-review-2026`
  - `apollo-io-pricing-explained`
  - `is-apollo-io-worth-it`
  - `what-is-apollo-io`
  - high-traffic `business-types` pages

### Commercial/compliance review
- Verify all outbound commercial links still point to the intended Apollo referral URL
- Verify `nofollow sponsored noopener noreferrer` remains on referral links
- Re-check disclosure visibility on pages with stronger purchase intent

## Release verification commands

```bash
npm run lint
npm run build
npm run check:images
npm run check:interlinking
npm run check:guide-hrefs
```

## Optional maintenance command

Recompress JPEG assets again after adding new images:

```bash
powershell -ExecutionPolicy Bypass -File scripts/optimize-jpegs.ps1 -Root public\\images -Quality 78
```
