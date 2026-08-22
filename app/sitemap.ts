import type { MetadataRoute } from 'next';

import { guides, industries } from '@/lib/content';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/editorial-methodology', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/find-clients', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/outreach', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/sales-pipeline', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/business-types', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/for-startups', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/guides', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/compare', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/glossary', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.2 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.2 },
    { path: '/affiliate-disclosure', changeFrequency: 'yearly' as const, priority: 0.2 }
  ];

  const guideRoutes = guides.map((guide) => ({
    url: `${siteConfig.url}/guides/${guide.slug}`,
    lastModified: guide.updatedAt ? new Date(guide.updatedAt) : new Date('2026-03-26'),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));

  const industryRoutes = industries.map((industry) => ({
    url: `${siteConfig.url}/business-types/${industry.slug}`,
    lastModified: new Date('2026-03-26'),
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  const staticItems = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date('2026-03-26'),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  return [...staticItems, ...guideRoutes, ...industryRoutes];
}
