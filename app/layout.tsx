import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import { Footer } from '@/components/footer';
import { GA4 } from '@/components/ga4';
import { Header } from '@/components/header';
import { OrganizationSchema, WebSiteSchema } from '@/components/seo-schemas';
import { siteConfig } from '@/lib/site';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'B2B Lead Generation Hub',
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen`}>
        <WebSiteSchema url={siteConfig.url} name={siteConfig.name} description={siteConfig.description} />
        <OrganizationSchema url={siteConfig.url} name={siteConfig.name} />
        <Suspense fallback={null}>
          <GA4 />
        </Suspense>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-lg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

