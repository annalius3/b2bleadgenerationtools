import { guides } from '@/lib/content';
import { siteConfig } from '@/lib/site';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export async function GET() {
  const items = guides
    .map(
      (guide) => `
  <item>
    <title>${escapeXml(guide.title)}</title>
    <link>${siteConfig.url}/guides/${guide.slug}</link>
    <guid>${siteConfig.url}/guides/${guide.slug}</guid>
    <description>${escapeXml(guide.description)}</description>
  </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(siteConfig.name)}</title>
  <link>${siteConfig.url}</link>
  <description>${escapeXml(siteConfig.description)}</description>${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}
