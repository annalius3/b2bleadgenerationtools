import { readFileSync, writeFileSync } from 'fs';
import { guides } from '../src/lib/content.ts';

// Guides missing publishedAt get dates assigned by array position:
// earlier in array = published earlier, spreading dates across a realistic timeline.
const FILE = 'src/lib/content.ts';
let content = readFileSync(FILE, 'utf8');

const missing = guides.filter((g) => !g.publishedAt);
console.log(`Guides missing publishedAt: ${missing.length}`);

// Timeline: site content published between 2025-11-01 and 2026-04-10,
// leaving the 2026-04-15 and 2026-04-22 batches untouched.
const START = new Date('2025-11-01');
const END = new Date('2026-04-10');
const span = END.getTime() - START.getTime();

const total = guides.length;
let added = 0;

for (let idx = 0; idx < guides.length; idx++) {
  const g = guides[idx];
  if (g.publishedAt) continue;

  const d = new Date(START.getTime() + (idx / total) * span);
  const iso = d.toISOString().slice(0, 10);

  // Locate the object for this slug and append publishedAt/updatedAt
  // right after its relatedSlugs array close.
  const slugMarker = `slug: '${g.slug}'`;
  const slugIdx = content.indexOf(slugMarker);
  if (slugIdx < 0) { console.log(`  !! slug not found: ${g.slug}`); continue; }

  // Check whether this object already has publishedAt (shouldn't)
  // Find the relatedSlugs array for this object
  const relIdx = content.indexOf('relatedSlugs: [', slugIdx);
  if (relIdx < 0) { console.log(`  !! no relatedSlugs for ${g.slug}`); continue; }

  // Find the closing bracket of that array
  const closeIdx = content.indexOf(']', relIdx);
  if (closeIdx < 0) continue;

  // Verify we haven't crossed into the next object
  const nextSlugIdx = content.indexOf("\n    slug: '", slugIdx + 10);
  if (nextSlugIdx > 0 && relIdx > nextSlugIdx) { console.log(`  !! crossed object for ${g.slug}`); continue; }

  const insertAt = closeIdx + 1;
  const insertion = `,\r\n    publishedAt: '${iso}',\r\n    updatedAt: '${iso}'`;

  // Determine line ending style near insertion point
  const sample = content.slice(relIdx - 2, relIdx);
  const eol = sample === '\r\n' ? '\r\n' : '\n';

  const finalInsertion = `,\r\n    publishedAt: '${iso}',\r\n    updatedAt: '${iso}'`.replace(/\r\n/g, eol);

  content = content.slice(0, insertAt) + finalInsertion + content.slice(insertAt);
  added++;
}

writeFileSync(FILE, content, 'utf8');
console.log(`Added publishedAt/updatedAt to ${added} guides`);
