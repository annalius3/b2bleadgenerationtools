'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { pageview } from '@/lib/analytics';
import { isAnalyticsCookieRestricted } from '@/lib/geo';

const GEO_CACHE_KEY = 'geo-country';

const getCountry = async (): Promise<string | null> => {
  try {
    const cached = window.sessionStorage.getItem(GEO_CACHE_KEY);
    if (cached !== null) return cached === 'unknown' ? null : cached;
  } catch {
    // sessionStorage can be blocked; fall through to the network request.
  }

  try {
    const res = await fetch('/api/geo', { cache: 'no-store' });
    if (!res.ok) throw new Error('geo request failed');
    const data = (await res.json()) as { country?: string | null };
    const country =
      typeof data.country === 'string' && data.country.length === 2 ? data.country.toUpperCase() : null;
    try {
      window.sessionStorage.setItem(GEO_CACHE_KEY, country ?? 'unknown');
    } catch {
      // Ignore storage failures.
    }
    return country;
  } catch {
    // Fail closed: without a known country we do not store analytics cookies.
    return null;
  }
};

export const GA4 = () => {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-NF7C5NYTC6';
  const shouldLoad =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ||
    (typeof window !== 'undefined' && window.location.hostname === 'www.b2bleadgenerationtools.com');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!gaId || !shouldLoad) return;

    let cancelled = false;

    const init = async () => {
      const country = await getCountry();
      const globalPrivacyControl =
        typeof navigator !== 'undefined' &&
        (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
      const doNotTrack =
        typeof navigator !== 'undefined' &&
        (navigator.doNotTrack === '1' ||
          (navigator as Navigator & { msDoNotTrack?: string }).msDoNotTrack === '1');
      const analyticsStorage =
        !globalPrivacyControl && !doNotTrack && !isAnalyticsCookieRestricted(country) ? 'granted' : 'denied';

      if (cancelled) return;

      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };
      window.gtag = gtag;

      // Consent Mode v2: advertising signals stay denied everywhere. Analytics
      // storage is granted only outside the EEA/UK/CH and only if the visitor
      // has not sent a Global Privacy Control signal.
      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: analyticsStorage
      });
      gtag('js', new Date());
      gtag('config', gaId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });

      if (!document.getElementById('ga4-script')) {
        const script = document.createElement('script');
        script.id = 'ga4-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);
      }

      if (!cancelled) setReady(true);
    };

    void init();

    return () => {
      cancelled = true;
    };
  }, [gaId, shouldLoad]);

  useEffect(() => {
    if (!ready) return;
    const query = searchParams.toString();
    pageview(query ? `${pathname}?${query}` : pathname);
  }, [ready, pathname, searchParams]);

  return null;
};
