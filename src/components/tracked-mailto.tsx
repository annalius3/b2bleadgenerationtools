'use client';

import { trackEvent } from '@/lib/analytics';

export const TrackedMailto = ({ email }: { email: string }) => (
  <a
    href={`mailto:${email}`}
    className="mt-2 inline-flex text-lg font-semibold text-sky-700 transition hover:text-sky-900"
    onClick={() => trackEvent('mailto_contact_click', { email })}
  >
    {email}
  </a>
);
