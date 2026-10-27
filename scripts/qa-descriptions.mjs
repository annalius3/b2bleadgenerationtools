const BASE = process.argv[2] || 'http://localhost:3000';

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
      if (d.length < 110) out.push({ p, len: d.length, d, tlen: t.length });
    } catch {}
  }
};
await Promise.all(Array.from({ length: 12 }, worker));
out.sort((a, b) => a.len - b.len);
console.log(`total pages scanned: ${urls.length}, descriptions <110 chars: ${out.length}`);
for (const o of out) console.log(`${o.len} | ${o.p} | ${o.d}`);
