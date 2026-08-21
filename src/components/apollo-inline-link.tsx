'use client';

import { APOLLO_URL } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

export const ApolloInlineLink = ({ label = 'Apollo' }: { label?: string }) => (
  <a
    href={APOLLO_URL}
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2"
    onClick={() =>
      trackEvent('apollo_referral_click', {
        cta_location: 'inline_content',
        link_text: label,
        link_url: APOLLO_URL
      })
    }
  >
    {label}
  </a>
);
