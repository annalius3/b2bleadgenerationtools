import { NextResponse } from 'next/server';

import { isAnalyticsCookieRestricted } from '@/lib/geo';

/**
 * Returns the visitor country as seen by Vercel's edge network and whether
 * analytics cookies are allowed for it. The GA4 component calls this before it
 * initialises Google Analytics, so consent mode can default to denied for
 * EEA/UK/Swiss visitors without showing a cookie banner.
 */
export function GET(request: Request) {
  const headerCountry = request.headers.get('x-vercel-ip-country');
  const country = headerCountry ? headerCountry.toUpperCase() : null;

  return NextResponse.json(
    {
      country,
      analyticsCookiesAllowed: !isAnalyticsCookieRestricted(country)
    },
    {
      headers: {
        // Per-visitor value: never let a shared cache store it.
        'Cache-Control': 'private, max-age=3600',
        Vary: 'x-vercel-ip-country'
      }
    }
  );
}
