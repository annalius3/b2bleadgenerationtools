import type { MetadataRoute } from 'next';

import { guides, industries } from '@/lib/content';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/about',
    '/editorial-methodology',
    '/find-clients',
    '/outreach',
    '/sales-pipeline',
    '/business-types',
    '/for-startups',
    '/guides',
    '/contact',
    '/privacy',
    '/terms',
    '/affiliate-disclosure'
  ];

  const guideRoutes = guides.map((guide) => ({
    url: `${siteConfig.url}/guides/${guide.slug}`,
    lastModified: guide.updatedAt ? new Date(guide.updatedAt) : new Date('2026-03-26')
  }));

  const industryRoutes = industries.map((industry) => ({
    url: `${siteConfig.url}/business-types/${industry.slug}`,
    lastModified: new Date('2026-03-26')
  }));

  return [...staticRoutes, ...guideRoutes, ...industryRoutes].map((route) => ({
    url: typeof route === 'string' ? `${siteConfig.url}${route}` : route.url,
    lastModified: typeof route === 'string' ? new Date('2026-03-26') : route.lastModified
  }));
}

