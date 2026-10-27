import type { Metadata } from 'next';

import { siteConfig } from '@/lib/site';

const SUFFIX = ` | ${siteConfig.name}`;
const MAX_TITLE = 60;

// Cut at a word boundary so search engines never show a mid-word ellipsis.
const truncateAtWord = (value: string, max: number): string => {
  if (value.length <= max) return value;
  const cut = value.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 20 ? cut.slice(0, lastSpace) : value.slice(0, max)).trim();
};

// Google displays roughly 60 characters. Keep the brand suffix only when the
// whole title fits; otherwise fall back to the clean page title on its own.
const buildTitle = (title: string): Metadata['title'] => {
  if (title.length + SUFFIX.length <= MAX_TITLE) return title;
  if (title.length <= MAX_TITLE) return { absolute: title };
  return { absolute: truncateAtWord(title, MAX_TITLE) };
};

export const buildMetadata = ({
  title,
  description,
  path,
  type = 'website',
  image = '/images/home/hero-team.jpg',
  publishedTime,
  modifiedTime
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata => ({
  title: buildTitle(title),
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
    ],
    ...(publishedTime ? { publishedTime } : {}),
    ...(modifiedTime ? { modifiedTime } : {})
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${siteConfig.url}${image}`]
  }
});

