import type { Metadata } from 'next';

import { siteConfig } from '@/lib/site';

export const buildMetadata = ({
  title,
  description,
  path,
  type = 'website',
  image = '/images/home/hero-team.jpg'
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
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
        url: `${siteConfig.url}${image}`,
        width: 1200,
        height: 630,
        alt: title
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${siteConfig.url}${image}`]
  }
});

