import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contentFile = path.join(root, 'src', 'lib', 'content.ts');
const src = fs.readFileSync(contentFile, 'utf8');
const slugSet = new Set([...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]));
const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.md', '.mdx']);
const issues = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', '.next', 'node_modules', '.idea'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!exts.has(path.extname(entry.name))) continue;
    const text = fs.readFileSync(full, 'utf8');
    for (const match of text.matchAll(/href=\"\/guides\/([^\"]+)\"|href='\/guides\/([^']+)'/g)) {
      const slug = match[1] || match[2];
      if (!slugSet.has(slug)) {
        issues.push(`${path.relative(root, full)}: broken guide href "/guides/${slug}"`);
      }
    }
  }
}

walk(root);

if (issues.length) {
  console.error('Guide href check failed:');
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log('OK: no broken /guides/ href links found.');
