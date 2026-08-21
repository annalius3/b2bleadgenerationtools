'use client';

import { APOLLO_URL } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

export const ApolloButton = ({
  label = 'Try Apollo',
  className = '',
  location = 'button'
}: {
  label?: string;
  className?: string;
  location?: string;
}) => (
  <a
    href={APOLLO_URL}
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    className={`btn-primary ${className}`}
    onClick={() =>
      trackEvent('apollo_referral_click', {
        cta_location: location,
        link_text: label,
        link_url: APOLLO_URL
      })
    }
  >
    {label}
  </a>
);
