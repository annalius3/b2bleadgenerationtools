const BASE = process.argv[2] || 'https://www.b2bleadgenerationtools.com';
const SITE_HOST = new URL(BASE).hostname;

const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
const pages = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const external = new Map(); // url -> Set(pages)
let idx = 0;
const collect = async () => {
  while (idx < pages.length) {
    const page = pages[idx++];
    try {
      const html = await (await fetch(page)).text();
      for (const m of html.matchAll(/href="(https?:\/\/[^"#]+)"/g)) {
        const url = m[1];
        if (new URL(url).hostname === SITE_HOST) continue;
        if (!external.has(url)) external.set(url, new Set());
        external.get(url).add(page);
      }
    } catch {}
  }
};
await Promise.all(Array.from({ length: 8 }, collect));

const urls = [...external.keys()];
console.log(`pages scanned: ${pages.length}, unique external links: ${urls.length}\n`);

const results = [];
const check = async (url) => {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; SiteAudit/1.0)' },
      signal: AbortSignal.timeout(20000)
    });
    results.push({ url, status: res.status, final: res.url, pages: external.get(url).size });
  } catch (e) {
    results.push({ url, status: 'ERR', error: String(e).slice(0, 80), pages: external.get(url).size });
  }
};
let i = 0;
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (i < urls.length) await check(urls[i++]);
  })
);

results.sort((a, b) => String(a.status).localeCompare(String(b.status)));
const bad = results.filter((r) => r.status === 'ERR' || (typeof r.status === 'number' && r.status >= 400));
console.log(`broken/unreachable: ${bad.length}`);
for (const r of bad) console.log(`${r.status} | ${r.url} | used on ${r.pages} page(s)${r.error ? ' | ' + r.error : ''}`);
const redirected = results.filter((r) => r.final && r.final !== r.url && r.status < 400);
console.log(`\nredirected: ${redirected.length}`);
for (const r of redirected.slice(0, 20)) console.log(`-> ${r.final} (from ${r.url})`);
