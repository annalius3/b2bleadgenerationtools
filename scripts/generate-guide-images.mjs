import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const contentPath = path.join(projectRoot, 'src', 'lib', 'content.ts');
const outputDir = path.join(projectRoot, 'public', 'images', 'guides');

const source = fs.readFileSync(contentPath, 'utf8');

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const guidesSectionMatch = source.match(/export const guides:\s*Guide\[\]\s*=\s*\[([\s\S]*?)\n\];/);
if (!guidesSectionMatch) {
  throw new Error('Guides section not found in content.ts');
}

const guidesSection = guidesSectionMatch[1];
const guideMatches = [...guidesSection.matchAll(/slug:\s*'([^']+)'\s*,[\s\S]*?title:\s*'([^']+)'/g)];

if (!guideMatches.length) {
  throw new Error('No guides found in content.ts');
}

fs.mkdirSync(outputDir, { recursive: true });

const makeSvg = (title, index) => {
  const palette =
    index === 1
      ? { a: '#1d4ed8', b: '#22d3ee', c: '#eff6ff' }
      : { a: '#2563eb', b: '#14b8a6', c: '#ecfeff' };

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="780" viewBox="0 0 1400 780">
  <defs>
    <linearGradient id="bg${index}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.c}"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="accent${index}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${palette.a}"/>
      <stop offset="100%" stop-color="${palette.b}"/>
    </linearGradient>
    <filter id="shadow${index}">
      <feDropShadow dx="0" dy="10" stdDeviation="20" flood-opacity="0.14"/>
    </filter>
  </defs>
  <rect width="1400" height="780" fill="url(#bg${index})"/>
  <circle cx="1280" cy="90" r="180" fill="${palette.b}" opacity="0.12"/>
  <circle cx="150" cy="690" r="220" fill="${palette.a}" opacity="0.10"/>
  <rect x="95" y="92" width="1210" height="596" rx="28" fill="#ffffff" filter="url(#shadow${index})"/>
  <rect x="140" y="150" width="650" height="18" rx="9" fill="#dbeafe"/>
  <rect x="140" y="184" width="920" height="64" rx="12" fill="#f8fafc"/>
  <text x="160" y="226" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="700" fill="#0f172a">${escapeXml(title)}</text>
  <rect x="140" y="286" width="1120" height="16" rx="8" fill="#e2e8f0"/>
  <rect x="140" y="318" width="980" height="16" rx="8" fill="#e2e8f0"/>
  <rect x="140" y="350" width="1040" height="16" rx="8" fill="#e2e8f0"/>
  <rect x="140" y="404" width="520" height="230" rx="18" fill="#f8fafc"/>
  <rect x="690" y="404" width="570" height="230" rx="18" fill="#f8fafc"/>
  <rect x="170" y="437" width="220" height="12" rx="6" fill="#cbd5e1"/>
  <rect x="170" y="464" width="280" height="12" rx="6" fill="#cbd5e1"/>
  <rect x="170" y="492" width="180" height="12" rx="6" fill="#cbd5e1"/>
  <rect x="730" y="434" width="260" height="18" rx="9" fill="url(#accent${index})"/>
  <rect x="730" y="470" width="180" height="18" rx="9" fill="url(#accent${index})" opacity="0.75"/>
  <rect x="730" y="506" width="320" height="18" rx="9" fill="url(#accent${index})" opacity="0.55"/>
  <rect x="730" y="542" width="220" height="18" rx="9" fill="url(#accent${index})" opacity="0.38"/>
</svg>`;
};

for (const [, slug, title] of guideMatches) {
  const first = path.join(outputDir, `${slug}-1.svg`);
  const second = path.join(outputDir, `${slug}-2.svg`);
  fs.writeFileSync(first, makeSvg(title, 1), 'utf8');
  fs.writeFileSync(second, makeSvg(title, 2), 'utf8');
}

console.log(`Generated ${guideMatches.length * 2} guide images in ${outputDir}`);
