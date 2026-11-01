import { NextResponse } from 'next/server';

import { getRequestCountry, isAnalyticsCookieRestricted } from '@/lib/geo';

/**
 * Returns the visitor country (Cloudflare or Vercel header) and whether
 * analytics cookies are allowed for it. The GA4 component calls this before it
 * initialises Google Analytics, so consent mode can default to denied for
 * EEA/UK/Swiss visitors without showing a cookie banner.
 */
export function GET(request: Request) {
  const country = getRequestCountry(request.headers);

  return NextResponse.json(
    {
      country,
      analyticsCookiesAllowed: !isAnalyticsCookieRestricted(country)
    },
    {
      headers: {
        // Per-visitor value: never let a shared cache store it.
        'Cache-Control': 'private, max-age=3600',
        Vary: 'cf-ipcountry, x-vercel-ip-country'
      }
    }
  );
}
