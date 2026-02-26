import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const imagesDir = path.join(root, 'public', 'images');
const allowedExt = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const walk = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
      continue;
    }
    if (allowedExt.has(path.extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
};

const files = walk(imagesDir);
const byHash = new Map();

for (const file of files) {
  const buf = fs.readFileSync(file);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  const rel = path.relative(root, file).replaceAll('\\', '/');
  const arr = byHash.get(hash) ?? [];
  arr.push(rel);
  byHash.set(hash, arr);
}

const dups = [...byHash.values()].filter((items) => items.length > 1);

if (!dups.length) {
  console.log(`OK: no exact image duplicates across ${files.length} files.`);
  process.exit(0);
}

console.error(`Found ${dups.length} duplicate image groups:`);
for (const group of dups) {
  console.error(`- ${group.join(' | ')}`);
}
process.exit(1);
