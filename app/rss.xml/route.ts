import { guides } from '@/lib/content';
import { siteConfig } from '@/lib/site';

export async function GET() {
  const items = guides
    .sort((a, b) => {
      const dateA = a.updatedAt || a.publishedAt || '2026-01-01';
      const dateB = b.updatedAt || b.publishedAt || '2026-01-01';
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    })
    .map((guide) => {
      const pubDate = guide.publishedAt || '2026-01-01';
      return `    <item>
      <title>${guide.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</title>
      <link>${siteConfig.url}/guides/${guide.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/guides/${guide.slug}</guid>
      <description>${(guide.description ?? guide.title).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</description>
      <pubDate>${new Date(pubDate).toUTCString()}</pubDate>
      <category>${guide.hub}</category>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
    }
  });
}
