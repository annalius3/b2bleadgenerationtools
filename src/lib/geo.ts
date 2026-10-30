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
  return RESTRICTED_ANALYTICS_COUNTRIES.has(country.toUpperCase());
};
