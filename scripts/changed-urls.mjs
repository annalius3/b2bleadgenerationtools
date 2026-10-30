import { execSync } from 'node:child_process';
import fs from 'node:fs';

const base = process.argv[2] || 'HEAD~1';
const file = 'src/lib/content.ts';
const diff = execSync(`git diff -U0 ${base} -- ${file}`, { encoding: 'utf8' });
const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

const slugs = new Set();
for (const line of diff.split('\n')) {
  const m = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
  if (!m) continue;
  const start = Number(m[1]);
  for (let i = start - 1; i >= 0 && i > start - 20; i--) {
    const hit = lines[i].match(/^\s*slug: '([^']+)',$/);
    if (hit) {
      slugs.add(hit[1]);
      break;
    }
  }
}

const INDUSTRY_SLUGS = new Set([
  'fractional-executives',
  'pest-control',
  'waste-management',
  'landscaping-companies',
  'payroll-peo'
]);

const urls = [...slugs].map((s) =>
  INDUSTRY_SLUGS.has(s)
    ? `https://www.b2bleadgenerationtools.com/business-types/${s}`
    : `https://www.b2bleadgenerationtools.com/guides/${s}`
);
console.log(JSON.stringify(urls, null, 2));
console.error(`found ${urls.length} guide slugs`);
