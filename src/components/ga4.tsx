'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

import { pageview } from '@/lib/analytics';

export const GA4 = () => {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-NF7C5NYTC6';
  const shouldLoad =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ||
    (typeof window !== 'undefined' && window.location.hostname === 'www.b2bleadgenerationtools.com');
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId || !shouldLoad) return;
    const query = searchParams.toString();
    const target = query ? `${pathname}?${query}` : pathname;

    if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(() => pageview(target));
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(() => pageview(target), 0);
    return () => globalThis.clearTimeout(timeoutId);
  }, [gaId, pathname, searchParams, shouldLoad]);

  if (!gaId || !shouldLoad) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
      <Script id="ga4-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${gaId}', { page_path: window.location.pathname });`}
      </Script>
    </>
  );
};
