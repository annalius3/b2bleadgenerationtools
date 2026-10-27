import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'public', 'images', 'guides');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.jpg'));
const dims = {};

for (const f of files) {
  const buf = fs.readFileSync(path.join(dir, f));
  if (buf[0] !== 0xff || buf[1] !== 0xd8) continue;
  let i = 2;
  let w = 0;
  let h = 0;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    const isSof =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isSof) {
      h = buf.readUInt16BE(i + 5);
      w = buf.readUInt16BE(i + 7);
      break;
    }
    if (marker === 0xd8 || marker === 0xd9) {
      i += 2;
      continue;
    }
    const len = buf.readUInt16BE(i + 2);
    i += 2 + len;
  }
  if (w && h) dims[f] = [w, h];
}

const out = path.join(process.cwd(), 'src', 'lib', 'image-dimensions.json');
fs.writeFileSync(out, JSON.stringify(dims, null, 0) + '\n');
console.log(`Image dimensions manifest: ${Object.keys(dims).length} files -> ${out}`);
