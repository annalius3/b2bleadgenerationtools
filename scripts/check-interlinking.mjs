import fs from 'node:fs';
import path from 'node:path';

const file = path.join(process.cwd(), 'src', 'lib', 'content.ts');
const src = fs.readFileSync(file, 'utf8');

const guidesSection = src.match(/export const guides:\s*Guide\[\]\s*=\s*\[([\s\S]*?)\n\];/);
if (!guidesSection) {
  console.error('Failed to locate guides array in src/lib/content.ts');
  process.exit(1);
}

const block = guidesSection[1];
const slugSet = new Set([...block.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]));
const entries = [...block.matchAll(/slug:\s*'([^']+)'[\s\S]*?relatedSlugs:\s*\[([^\]]*)\]/g)].map((m) => ({
  slug: m[1],
  related: [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1])
}));

const issues = [];

for (const entry of entries) {
  if (entry.related.length < 2) {
    issues.push(`${entry.slug}: has only ${entry.related.length} related slugs (min 2).`);
  }
  if (entry.related.includes(entry.slug)) {
    issues.push(`${entry.slug}: contains self-reference in relatedSlugs.`);
  }
  for (const rel of entry.related) {
    if (!slugSet.has(rel)) {
      issues.push(`${entry.slug}: references missing slug "${rel}".`);
    }
  }
}

if (issues.length) {
  console.error('Interlinking check failed:');
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`OK: interlinking valid for ${entries.length} guides.`);
