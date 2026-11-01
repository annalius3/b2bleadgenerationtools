import { NextResponse, type NextRequest } from 'next/server';

import { getRequestCountry } from '@/lib/geo';

/**
 * Edge-level bot and abuse protection.
 *
 * Vercel runs this before the CDN cache, so blocked requests never reach the
 * page renderer or consume bandwidth for HTML. Country lists and the per-IP
 * limit are configurable through environment variables so the defaults can be
 * relaxed without a code change.
 */

const BLOCKED_COUNTRIES = new Set(
  (process.env.BLOCKED_COUNTRIES ?? 'CN,SG')
    .split(',')
    .map((value) => value.trim().toUpperCase())
    .filter((value) => /^[A-Z]{2}$/.test(value))
);

// 0 disables the per-IP limiter. It is opt-in because a shared corporate IP or
// a full-site crawl can legitimately exceed a low limit; country and path
// blocks below do not depend on it.
const RATE_LIMIT_PER_MINUTE = Number(process.env.RATE_LIMIT_PER_MINUTE ?? '0');
const RATE_WINDOW_MS = 60_000;

/** Paths probed by vulnerability scanners. Nothing here exists on the site. */
const BLOCKED_PATHS = [
  '/.env',
  '/.git',
  '/.svn',
  '/.aws',
  '/.ssh',
  '/.ds_store',
  '/wp-admin',
  '/wp-login',
  '/wp-content',
  '/wp-includes',
  '/wp-json',
  '/xmlrpc.php',
  '/phpmyadmin',
  '/pma/',
  '/administrator',
  '/vendor/',
  '/config/',
  '/actuator',
  '/server-status',
  '/cgi-bin/',
  '/shell',
  '/backup',
  '/db.sql',
  '/dump.sql',
  '/composer.json',
  '/package.json',
  '/yarn.lock',
  '/docker-compose'
];

/** User agents that are almost exclusively scripts, scanners, or scrapers. */
const BLOCKED_USER_AGENT =
  /(python-requests|python-urllib|aiohttp|httpx|curl\/|wget\/|go-http-client|libwww-perl|scrapy|masscan|zgrab|nmap|nikto|sqlmap|nuclei|feroxbuster|gobuster|dirbuster|node-fetch|phantomjs|headlesschrome|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|bytespider)/i;

/**
 * Search engine crawlers are allowed through country blocks so that a Google
 * data centre that geolocates to a blocked country cannot hurt indexing.
 */
const SEARCH_BOT = /(googlebot|bingbot|duckduckbot|yandexbot|applebot|baiduspider)/i;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const isRateLimited = (key: string) => {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  bucket.count += 1;

  // Keep the map bounded on long-lived edge instances.
  if (buckets.size > 5000) {
    for (const [entryKey, entry] of buckets) {
      if (now >= entry.resetAt) buckets.delete(entryKey);
    }
  }

  return bucket.count > RATE_LIMIT_PER_MINUTE;
};

const deny = (status: number, message: string) => {
  const headers: Record<string, string> = {
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex'
  };

  if (status === 429) {
    headers['Retry-After'] = '60';
  }

  return new NextResponse(message, { status, headers });
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const lowerPath = pathname.toLowerCase();

  if (BLOCKED_PATHS.some((path) => lowerPath.startsWith(path))) {
    return deny(404, 'Not Found');
  }

  const userAgent = request.headers.get('user-agent') ?? '';
  if (!userAgent || BLOCKED_USER_AGENT.test(userAgent)) {
    return deny(403, 'Forbidden');
  }

  const isSearchBot = SEARCH_BOT.test(userAgent);
  const country = getRequestCountry(request.headers);

  if (!isSearchBot && country && BLOCKED_COUNTRIES.has(country)) {
    return deny(403, 'Forbidden');
  }

  if (method !== 'GET' && method !== 'HEAD' && method !== 'POST' && method !== 'OPTIONS') {
    return deny(405, 'Method Not Allowed');
  }

  if (method === 'POST' && !pathname.startsWith('/api/')) {
    return deny(405, 'Method Not Allowed');
  }

  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';

  if (!isSearchBot && RATE_LIMIT_PER_MINUTE > 0 && isRateLimited(ip)) {
    return deny(429, 'Too Many Requests');
  }

  return NextResponse.next();
}

export const config = {
  // Run on every route except immutable build assets. This also covers
  // /_next/image and /images, which are the expensive requests to serve.
  matcher: ['/((?!_next/static).*)']
};
