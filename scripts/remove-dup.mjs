import { readFileSync, writeFileSync } from 'fs';

const FILE = 'src/lib/content.ts';
const MARK = "slug: 'linkedin-sales-navigator-vs-apollo'";

let c = readFileSync(FILE, 'utf8');
const i = c.indexOf(MARK);
if (i < 0) { console.log('not found'); process.exit(1); }

const start = c.lastIndexOf('\r\n  {\r\n', i);
const startLF = c.lastIndexOf('\n  {\n', i);
const startPos = Math.max(start, startLF);
const endCRLF = c.indexOf('\r\n  },', i);
const endLF = c.indexOf('\n  },', i);
const end = endCRLF >= 0 && (endLF < 0 || endCRLF <= endLF) ? endCRLF : endLF;
const endLen = end === endCRLF ? '\r\n  },'.length : '\n  },'.length;
if (startPos < 0 || end < 0) { console.log('boundaries not found', startPos, end); process.exit(1); }

// Keep the trailing "\n  }," we found -> replace from start to end+5? We want to remove the whole object including its closing brace+comma
const block = c.slice(startPos, end + endLen);
console.log('BLOCK LENGTH:', block.length);
console.log('FIRST 100:', JSON.stringify(block.slice(0, 100)));
console.log('LAST 100:', JSON.stringify(block.slice(-100)));

// Replace the whole block with empty string (removes object + trailing comma)
c = c.slice(0, startPos) + c.slice(end + endLen);
writeFileSync(FILE, c, 'utf8');
console.log('REMOVED duplicate article block');
