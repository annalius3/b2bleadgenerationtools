const BASE = process.argv[2] || 'http://localhost:3000';
const MIN = 110;
const MAX = 170;

const sm = await (await fetch(BASE + '/sitemap.xml')).text();
const urls = [...sm.matchAll(/<loc>https:\/\/www\.b2bleadgenerationtools\.com([^<]*)<\/loc>/g)].map(
  (m) => m[1] || '/'
);

const out = [];
let idx = 0;
const worker = async () => {
  while (idx < urls.length) {
    const p = urls[idx++];
    try {
      const res = await fetch(BASE + p);
      const h = await res.text();
      const d = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
      const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
      if (d.length < MIN) out.push({ p, len: d.length, d, tlen: t.length, kind: 'short' });
      else if (d.length > MAX) out.push({ p, len: d.length, d, tlen: t.length, kind: 'long' });
    } catch {}
  }
};
await Promise.all(Array.from({ length: 12 }, worker));
out.sort((a, b) => a.len - b.len);
const short = out.filter((o) => o.kind === 'short').length;
const long = out.filter((o) => o.kind === 'long').length;
console.log(`scanned: ${urls.length}, short (<${MIN}): ${short}, long (>${MAX}): ${long}`);
for (const o of out) console.log(`${o.len} | ${o.p} | ${o.d}`);
