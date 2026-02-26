import type { MetadataRoute } from 'next';

import { guides, industries } from '@/lib/content';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/find-clients',
    '/outreach',
    '/sales-pipeline',
    '/by-industry',
    '/for-startups',
    '/guides',
    '/contact',
    '/privacy',
    '/terms',
    '/affiliate-disclosure'
  ];

  const guideRoutes = guides.map((guide) => `/guides/${guide.slug}`);
  const industryRoutes = industries.map((industry) => `/by-industry/${industry.slug}`);

  return [...staticRoutes, ...guideRoutes, ...industryRoutes].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date()
  }));
}
