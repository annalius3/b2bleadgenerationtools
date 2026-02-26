import type { Metadata } from 'next';

import { siteConfig } from '@/lib/site';

export const buildMetadata = ({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  path: string;
}): Metadata => ({
  title,
  description,
  alternates: {
    canonical: `${siteConfig.url}${path}`
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}${path}`,
    siteName: siteConfig.name,
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description
  }
});
