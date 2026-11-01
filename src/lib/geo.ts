/**
 * Countries where analytics cookies require prior consent (GDPR / UK GDPR / FADP
 * and equivalent national frameworks). Visitors from these countries get Google
 * Analytics in cookieless mode: no analytics cookies are written.
 *
 * EU/EEA member states + UK, Switzerland, and the Crown Dependencies / Gibraltar,
 * which apply GDPR-equivalent rules.
 */
export const RESTRICTED_ANALYTICS_COUNTRIES = new Set([
  // EU
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  // EEA
  'IS',
  'LI',
  'NO',
  // UK + Switzerland
  'GB',
  'CH',
  // Crown Dependencies and Gibraltar (UK GDPR equivalents)
  'GI',
  'IM',
  'JE',
  'GG'
]);

/**
 * Returns true when analytics cookies must not be stored for the given country.
 * Unknown country is treated as restricted (fail closed).
 */
export const isAnalyticsCookieRestricted = (country: string | null | undefined) => {
  if (!country) return true;
  const code = country.toUpperCase();
  // XX = unknown (Cloudflare), T1 = Tor. Both are treated as restricted.
  if (code === 'XX' || code === 'T1') return true;
  return RESTRICTED_ANALYTICS_COUNTRIES.has(code);
};

const normalizeCountry = (raw: string | null): string | null => {
  if (!raw) return null;
  const country = raw.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(country) ? country : null;
};

// Cloudflare ray IDs look like "8a1b2c3d4e5f6a7b-SIN". Validating the shape
// stops a direct-to-Vercel client from enabling the Cloudflare branch with a
// throwaway header, while real Cloudflare requests always match.
const CLOUDFLARE_RAY = /^[0-9a-f]{16}-[A-Z]{3}$/i;

/**
 * Resolves the visitor country from request headers.
 *
 * When Cloudflare sits in front of Vercel, `x-vercel-ip-country` only reflects
 * the Cloudflare edge location, so `cf-ipcountry` is the accurate source. On
 * direct Vercel traffic the Vercel header is platform-set and cannot be
 * overridden by the client, so it is used instead.
 */
export const getRequestCountry = (headers: Headers): string | null => {
  const cfRay = headers.get('cf-ray')?.trim();
  if (cfRay && CLOUDFLARE_RAY.test(cfRay)) {
    return normalizeCountry(headers.get('cf-ipcountry'));
  }

  return normalizeCountry(headers.get('x-vercel-ip-country'));
};
