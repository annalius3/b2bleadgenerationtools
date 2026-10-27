const BASE = process.argv[2] || 'http://localhost:3000';
const SITE = 'https://www.b2bleadgenerationtools.com';
const CONCURRENCY = 12;

const issues = [];
const warnings = [];
const fail = (category, msg) => issues.push(`[${category}] ${msg}`);
const warn = (category, msg) => warnings.push(`[${category}] ${msg}`);

const stats = { pages: 0, requests: 0, errors: 0, maxMs: 0, totalMs: 0 };
const timings = [];

async function get(path, opts = {}) {
  stats.requests++;
  const t0 = Date.now();
  const res = await fetch(path.startsWith('http') ? path : BASE + path, { redirect: 'manual', ...opts });
  const ms = Date.now() - t0;
  stats.totalMs += ms;
  if (ms > stats.maxMs) stats.maxMs = ms;
  timings.push({ path, ms, status: res.status });
  return res;
}

async function getText(path) {
  const res = await get(path);
  const text = res.status === 200 || res.status === 404 ? await res.text() : '';
  return { res, text };
}

async function pool(items, worker, limit = CONCURRENCY) {
  const results = [];
  let i = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      try { results[idx] = await worker(items[idx], idx); }
      catch (err) { results[idx] = { error: err.message }; }
    }
  });
  await Promise.all(runners);
  return results;
}

const first = (re, text) => { const m = text.match(re); return m ? m[1].trim() : null; };

// ---------- 1. SITEMAP ----------
console.log('1. SITEMAP');
const sitemapRes = await get('/sitemap.xml');
if (sitemapRes.status !== 200) fail('sitemap', `/sitemap.xml => ${sitemapRes.status}`);
const sitemapXml = await sitemapRes.text();
if (!sitemapXml.includes('<urlset')) fail('sitemap', 'no <urlset> root');
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sitemapPaths = [...new Set(sitemapUrls.map((u) => u.replace(SITE, '')))].filter((p) => !p.startsWith('http'));
const imageUrls = [...sitemapXml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => m[1]);
console.log(`   urls: ${sitemapPaths.length}, image entries: ${imageUrls.length}`);
if (sitemapPaths.length < 370) fail('sitemap', `only ${sitemapPaths.length} urls (expected 375)`);

// lastmod format
for (const m of sitemapXml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
  if (!/^\d{4}-\d{2}-\d{2}/.test(m[1])) { fail('sitemap', `bad lastmod: ${m[1]}`); break; }
}

// ---------- 2. ROBOTS ----------
console.log('2. ROBOTS.TXT');
const robots = await getText('/robots.txt');
if (robots.res.status !== 200) fail('robots', `status ${robots.res.status}`);
if (!robots.text.includes('Sitemap:')) fail('robots', 'no Sitemap directive');
if (!robots.text.includes('sitemap.xml')) fail('robots', 'sitemap.xml not referenced');
if (/Disallow: \/$/.test(robots.text.trim().split('\n').pop() || '')) warn('robots', 'site disallowed entirely');

// ---------- 3. RSS ----------
console.log('3. RSS');
const rss = await getText('/rss.xml');
if (rss.res.status !== 200) fail('rss', `status ${rss.res.status}`);
const rssItems = [...rss.text.matchAll(/<item>/g)].length;
const rssLinks = [...rss.text.matchAll(/<link>([^<]+)<\/link>/g)].map((m) => m[1]).filter((l) => l.startsWith(SITE));
console.log(`   items: ${rssItems}`);
if (rssItems < 10) fail('rss', `only ${rssItems} items`);
if (!rss.text.includes('<rss')) fail('rss', 'no rss root');
if (rssItems > 0 && rssLinks.length === 0) fail('rss', 'no absolute links in items');
for (const l of rssLinks.slice(0, 5)) {
  const r = await get(l.replace(SITE, ''));
  if (r.status !== 200) fail('rss', `item link dead: ${l} => ${r.status}`);
}

// ---------- 4. 404 & EDGE CASES ----------
console.log('4. 404 & EDGE CASES');
const edgeCases = [
  ['/this-page-does-not-exist-xyz', 404, 'unknown page'],
  ['/guides/no-such-guide-xyz', 404, 'unknown guide'],
  ['/business-types/no-such-industry-xyz', 404, 'unknown industry'],
  ['/Guides/Apollo-Vs-Clay', 'no5xx', 'case sensitivity'],
  ['/guides/apollo-vs-clay/', 'no5xx', 'trailing slash'],
  ['/guides/apollo-vs-clay%20', 404, 'url-encoded space'],
  ['/guides/../guides/apollo-vs-clay', 'no5xx', 'path traversal'],
  ['//guides//apollo-vs-clay', 'no5xx', 'double slashes'],
  ['/guides/', 'no5xx', 'guides index trailing slash'],
  ['/nonexistent.xml', 404, 'unknown xml']
];
for (const [path, expect, label] of edgeCases) {
  const r = await get(path);
  if (expect === 'no5xx') {
    if (r.status >= 500) fail('edge', `${label} (${path}) => ${r.status}`);
    else console.log(`   ${label} => ${r.status}`);
  } else if (r.status !== expect) {
    fail('edge', `${label} (${path}) => ${r.status}, expected ${expect}`);
  }
}
// Next.js 404 page must not be indexable
const nf = await getText('/this-page-does-not-exist-xyz');
if (nf.res.status === 404 && !nf.text.includes('noindex') && !nf.res.headers.get('x-robots-tag')) {
  warn('edge', '404 page has no noindex signal (status 404 mitigates)');
}

// ---------- 5. SEARCH & API ----------
console.log('5. SEARCH & API');
const search = await getText('/guides/search?q=apollo');
if (search.res.status !== 200) fail('search', `?q=apollo => ${search.res.status}`);
if (search.res.status === 200 && !/apollo/i.test(search.text)) fail('search', 'no results markup for q=apollo');
const searchEmpty = await get('/guides/search');
if (searchEmpty.status >= 500) fail('search', `empty query => ${searchEmpty.status}`);
const apiGet = await get('/api/subscribe');
if (![405, 404].includes(apiGet.status)) warn('api', `GET /api/subscribe => ${apiGet.status} (expected 405/404)`);
const apiPost = await get('/api/subscribe', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({}) });
if (apiPost.status >= 500) warn('api', `POST /api/subscribe empty body => ${apiPost.status} (graceful 4xx preferred)`);
console.log(`   search: ${search.res.status}, api POST: ${apiPost.status}`);

// ---------- 6. FULL CRAWL ----------
console.log('6. FULL CRAWL of sitemap pages...');
const pageChecks = await pool(sitemapPaths, async (path) => {
  const { res, text } = await getText(path);
  if (res.status !== 200) { fail('crawl', `${path} => ${res.status}`); return; }
  stats.pages++;
  const isGuide = path.startsWith('/guides/');
  const isHtml = (res.headers.get('content-type') || '').includes('text/html');
  if (!isHtml) return;

  const title = first(/<title>([^<]*)<\/title>/, text);
  const desc = first(/<meta name="description" content="([^"]*)"/, text);
  const canonical = first(/<link rel="canonical" href="([^"]*)"/, text);
  const ogTitle = first(/<meta property="og:title" content="([^"]*)"/, text);
  const ogImage = first(/<meta property="og:image" content="([^"]*)"/, text);
  const viewport = first(/<meta name="viewport" content="([^"]*)"/, text);
  const lang = first(/<html[^>]* lang="([^"]+)"/, text);
  const h1s = (text.match(/<h1[\s>]/g) || []).length;

  if (!title) fail('meta', `${path}: missing <title>`);
  if (title && title.length > 65) warn('meta', `${path}: title ${title.length} chars (>65)`);
  if (!desc) fail('meta', `${path}: missing meta description`);
  if (desc && (desc.length < 110 || desc.length > 170)) warn('meta', `${path}: description ${desc.length} chars (110-170 ideal)`);
  const canonicalOk = canonical === SITE || canonical === SITE + '/' || (path === '/' && (canonical === SITE || canonical === SITE + '/')) || canonical === SITE + path;
  if (!canonical) fail('seo', `${path}: missing canonical`);
  if (canonical && !canonicalOk) fail('seo', `${path}: canonical mismatch: ${canonical} vs ${SITE}${path === '/' ? '' : path}`);
  if (!ogTitle) fail('og', `${path}: missing og:title`);
  if (!ogImage) warn('og', `${path}: missing og:image`);
  if (!viewport) fail('a11y', `${path}: missing viewport meta`);
  if (!/<meta charset=/i.test(text)) fail('meta', `${path}: missing charset`);
  if (!lang) fail('a11y', `${path}: missing html lang`);
  if (h1s !== 1) fail('a11y', `${path}: ${h1s} H1 tags (expected 1)`);

  // JSON-LD
  const ldBlocks = [...text.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  if (isGuide && ldBlocks.length === 0) fail('schema', `${path}: guide without JSON-LD`);
  let schemaTypes = [];
  for (const b of ldBlocks) {
    try {
      const parsed = JSON.parse(b[1]);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      for (const p of arr) if (p && p['@type']) schemaTypes.push(p['@type']);
    } catch (e) { fail('schema', `${path}: invalid JSON-LD (${e.message.slice(0, 60)})`); }
  }
  if (isGuide) {
    for (const needed of ['BreadcrumbList', 'FAQPage']) {
      if (!schemaTypes.some((t) => String(t).includes(needed))) warn('schema', `${path}: no ${needed} schema`);
    }
  }

  // mixed content
  for (const m of text.matchAll(/(?:src|href)="(http:\/\/[^"]+)"/g)) {
    if (!m[1].startsWith('http://localhost')) fail('mixed', `${path}: insecure resource ${m[1].slice(0, 80)}`);
  }

  // collect internal links + images (direct src + next/image optimized + og:image)
  const links = [...text.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]);
  const ogImgUrl = first(/<meta property="og:image" content="([^"]+)"/, text);
  const ogImgPath =
    ogImgUrl && ogImgUrl.startsWith(SITE) ? ogImgUrl.slice(SITE.length).split('?')[0] : null;
  const imgs = [
    ...[...text.matchAll(/src="(\/images\/[^"?]+)"/g)].map((m) => m[1]),
    ...[...text.matchAll(/\/_next\/image\?url=([^"&]+)/g)].map((m) => decodeURIComponent(m[1])),
    ...(ogImgPath && ogImgPath.startsWith('/') ? [ogImgPath] : [])
  ];
  return { path, title, desc, canonical, links, imgs, schemaTypes, h1s };
});

const pages = pageChecks.filter(Boolean);
const titles = new Map();
const descs = new Map();
const canonicals = new Map();
for (const p of pages) {
  if (!p.title) continue;
  if (titles.has(p.title)) warn('dup', `duplicate title: "${p.title.slice(0, 50)}" in ${p.path} and ${titles.get(p.title)}`);
  else titles.set(p.title, p.path);
  if (p.desc) {
    if (descs.has(p.desc)) warn('dup', `duplicate description: ${p.path} and ${descs.get(p.desc)}`);
    else descs.set(p.desc, p.path);
  }
  if (p.canonical) {
    if (canonicals.has(p.canonical)) fail('dup', `duplicate canonical: ${p.path} and ${canonicals.get(p.canonical)}`);
    else canonicals.set(p.canonical, p.path);
  }
}
console.log(`   crawled: ${pages.length} html pages`);

// ---------- 7. LINK INTEGRITY ----------
console.log('7. LINK INTEGRITY');
const internalLinks = new Set();
for (const p of pages) for (const l of p.links) internalLinks.add(l);
const linkList = [...internalLinks];
console.log(`   unique internal links: ${linkList.length}`);
await pool(linkList, async (l) => {
  const r = await get(l);
  if (r.status >= 300 && r.status < 400) {
    const loc = r.headers.get('location') || '';
    if (loc.startsWith('/')) {
      const r2 = await get(loc);
      if (r2.status !== 200) fail('links', `${l} redirects to ${loc} => ${r2.status}`);
    }
  } else if (r.status !== 200) {
    fail('links', `${l} => ${r.status}`);
  }
});
console.log('   link check done');

// ---------- 8. IMAGE INTEGRITY ----------
console.log('8. IMAGE INTEGRITY');
const allImgs = new Set();
for (const p of pages) for (const i of p.imgs) allImgs.add(i);
const imgList = [...allImgs];
console.log(`   unique images referenced: ${imgList.length}`);
await pool(imgList, async (i) => {
  const r = await get(i);
  if (r.status !== 200) fail('images', `${i} => ${r.status}`);
  const ct = r.headers.get('content-type') || '';
  if (!ct.includes('image')) fail('images', `${i} content-type ${ct}`);
});
// sitemap image entries
const sitemapImgsUnique = [...new Set(imageUrls.map((u) => u.replace(SITE, '')))];
console.log(`   sitemap image entries: ${sitemapImgsUnique.length}`);
await pool(sitemapImgsUnique, async (i) => {
  const r = await get(i);
  if (r.status !== 200) fail('images', `sitemap image ${i} => ${r.status}`);
});

// ---------- 9. HUB PAGES & GUIDE CONTENT ----------
console.log('9. HUB PAGES & CONTENT SIGNALS');
const hubs = ['/find-clients', '/outreach', '/sales-pipeline', '/for-startups', '/guides', '/business-types', '/compare', '/glossary', '/start-here', '/about', '/contact', '/privacy', '/terms', '/affiliate-disclosure', '/editorial-methodology', '/authors/katya', '/rss.xml'];
for (const h of hubs) {
  const r = await get(h);
  if (r.status !== 200) fail('hubs', `${h} => ${r.status}`);
}
// guide content signals on 5 sample guides
const sampleGuides = ['/guides/apollo-vs-clay', '/guides/cold-email-to-cfos', '/guides/how-to-calculate-pipeline-coverage', '/guides/apollo-io-api-tutorial', '/guides/b2b-lead-generation-for-distributors'];
for (const g of sampleGuides) {
  const { res, text } = await getText(g);
  if (res.status !== 200) continue;
  if (!/Related Guides/.test(text)) fail('content', `${g}: no Related Guides section`);
  if (!/breadcrumb/i.test(text)) warn('content', `${g}: no breadcrumb markup`);
  if (!/katya/i.test(text)) warn('content', `${g}: no author byline (E-E-A-T)`);
  if (/<img(?![^>]*alt=)/.test(text)) warn('a11y', `${g}: img without alt attribute`);
  if (!/faq/i.test(text)) warn('content', `${g}: no FAQ section`);
}
// RSS link in head of home page
const home = await getText('/');
if (!home.text.includes('application/rss+xml')) warn('seo', 'home page: no RSS <link> in head');
if (!home.text.includes('G-NF7C5NYTC6') && process.env.VERCEL_ENV === undefined) {
  // GA4 only in production build; local may omit by host check
}

// ---------- 10. PERFORMANCE SMOKE ----------
console.log('10. PERFORMANCE');
const sorted = timings.filter((t) => t.status === 200).map((t) => t.ms).sort((a, b) => a - b);
const p50 = sorted[Math.floor(sorted.length * 0.5)] || 0;
const p95 = sorted[Math.floor(sorted.length * 0.95)] || 0;
console.log(`   requests: ${stats.requests}, pages: ${stats.pages}`);
console.log(`   server time p50: ${p50}ms, p95: ${p95}ms, max: ${stats.maxMs}ms`);
if (p95 > 1500) warn('perf', `p95 server response ${p95}ms > 1500ms`);

// ---------- SUMMARY ----------
console.log('\n================ SUMMARY ================');
console.log(`FAIL: ${issues.length}   WARN: ${warnings.length}`);
if (issues.length) { console.log('\n--- ISSUES ---'); for (const i of issues) console.log('  ' + i); }
if (warnings.length) {
  const byCat = new Map();
  for (const w of warnings) {
    const cat = (w.match(/^\[(\w+)\]/) || [])[1] || 'other';
    if (!byCat.has(cat)) byCat.set(cat, []);
    byCat.get(cat).push(w);
  }
  console.log('\n--- WARNINGS BY CATEGORY ---');
  for (const [cat, list] of [...byCat.entries()].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  [${cat}] ${list.length} total, examples:`);
    for (const w of list.slice(0, 8)) console.log('    ' + w);
    if (list.length > 8) console.log(`    ... +${list.length - 8} more`);
  }
}
process.exit(issues.length ? 1 : 0);
