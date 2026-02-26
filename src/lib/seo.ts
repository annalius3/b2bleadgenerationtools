import type { Metadata } from 'next';

import { siteConfig } from '@/lib/site';

export const buildMetadata = ({
  title,
  description,
  path,
  type = 'website'
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
}): Metadata => ({
  title,
  description,
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: `${siteConfig.url}${path}`
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}${path}`,
    siteName: siteConfig.name,
    type,
    images: [
      {
        url: `${siteConfig.url}/images/home/hero-team.jpg`,
        width: 1200,
        height: 630,
        alt: 'B2B Lead Generation Tools'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${siteConfig.url}/images/home/hero-team.jpg`]
  }
});
