const BASE = process.argv[2] || 'http://localhost:3000';

const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sm.matchAll(/<loc>https:\/\/www\.b2bleadgenerationtools\.com([^<]*)<\/loc>/g)].map(
  (m) => m[1] || '/'
);

const issues = [];
const schemaCount = new Map();
const stats = { pages: 0, words: [] };

let idx = 0;
const worker = async () => {
  while (idx < urls.length) {
    const path = urls[idx++];
    let html;
    try {
      html = await (await fetch(BASE + path)).text();
    } catch {
      issues.push({ path, kind: 'fetch-failed' });
      continue;
    }
    stats.pages++;

    // headings in document order
    const headings = [...html.matchAll(/<h([1-6])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/g)].map((m) => ({
      level: Number(m[1]),
      text: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    }));
    let prev = 0;
    for (const h of headings) {
      if (prev && h.level > prev + 1) {
        issues.push({ path, kind: 'heading-skip', detail: `h${prev} -> h${h.level}: ${h.text.slice(0, 60)}` });
        break;
      }
      prev = h.level;
    }

    // images without alt
    for (const m of html.matchAll(/<img\b([^>]*)>/g)) {
      if (!/\balt=/.test(m[1])) issues.push({ path, kind: 'img-no-alt', detail: m[1].slice(0, 90) });
      else if (/\balt=""/.test(m[1]) && !/aria-hidden="true"/.test(m[1]) && !/role="presentation"/.test(m[1]))
        issues.push({ path, kind: 'img-empty-alt', detail: m[1].slice(0, 90) });
    }

    // social meta
    if (!/<meta property="og:image"/.test(html)) issues.push({ path, kind: 'no-og-image' });
    if (!/<meta name="twitter:card"/.test(html)) issues.push({ path, kind: 'no-twitter-card' });
    if (!/<html[^>]*lang="en"/.test(html)) issues.push({ path, kind: 'no-lang-en' });

    // schema types
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try {
        const data = JSON.parse(m[1]);
        const types = [];
        const walk = (node) => {
          if (!node || typeof node !== 'object') return;
          if (Array.isArray(node)) return node.forEach(walk);
          if (node['@type']) types.push([].concat(node['@type']).join(','));
          if (node['@graph']) walk(node['@graph']);
        };
        walk(data);
        for (const t of types) schemaCount.set(t, (schemaCount.get(t) || 0) + 1);
      } catch {
        issues.push({ path, kind: 'bad-json-ld' });
      }
    }

    // main text volume
    const main = (html.match(/<main[\s\S]*?<\/main>/) || [''])[0];
    const text = main
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z#0-9]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = text ? text.split(' ').length : 0;
    stats.words.push({ path, words });
  }
};
await Promise.all(Array.from({ length: 8 }, worker));

console.log(`pages: ${stats.pages}, structural issues: ${issues.length}`);
const byKind = new Map();
for (const i of issues) byKind.set(i.kind, (byKind.get(i.kind) || 0) + 1);
for (const [k, v] of [...byKind].sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${v}`);
for (const i of issues.slice(0, 25)) console.log(`- [${i.kind}] ${i.path} ${i.detail || ''}`);

console.log('\nschema types (pages using them):');
for (const [t, n] of [...schemaCount].sort((a, b) => b[1] - a[1])) console.log(`  ${t}: ${n}`);

stats.words.sort((a, b) => a.words - b.words);
console.log('\nthinnest pages by main word count:');
for (const w of stats.words.slice(0, 10)) console.log(`  ${w.words} | ${w.path}`);
