'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { trackEvent } from '@/lib/analytics';

export const TrackedIndustryLink = ({
  href,
  slug,
  name,
  className,
  prefetch = false,
  children
}: {
  href: string;
  slug: string;
  name: string;
  className?: string;
  prefetch?: boolean;
  children?: React.ReactNode;
}) => (
  <Link
    href={href as Route}
    prefetch={prefetch}
    className={className}
    onClick={() => trackEvent('business_type_click', { industry_slug: slug, industry_name: name })}
  >
    {children ?? name}
  </Link>
);
