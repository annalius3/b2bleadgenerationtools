import Link from 'next/link';

import { BrandLogo } from '@/components/brand-logo';
import { Container } from '@/components/container';
import { renderApolloText } from '@/lib/render-apollo-text';
import { industries } from '@/lib/content';

const topIndustries = industries.slice(0, 8);

export const Footer = () => (
  <footer className="mt-20 border-t border-slate-200 bg-white/95">
    <Container>
      <div className="grid gap-8 py-12 text-sm text-slate-600 md:grid-cols-4">
        <div>
          <BrandLogo />
          <p className="mt-2 max-w-xs">
            {renderApolloText(
              'Find the right outbound strategy, learn proven workflows, and move faster with Apollo.'
            )}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Navigation</p>
          <Link href="/find-clients" className="block hover:text-blue-700">
            Find Clients
          </Link>
          <Link href="/outreach" className="block hover:text-blue-700">
            Outreach
          </Link>
          <Link href="/sales-pipeline" className="block hover:text-blue-700">
            Sales Pipeline
          </Link>
          <Link href="/for-startups" className="block hover:text-blue-700">
            For Startups
          </Link>
          <Link href="/guides" className="block hover:text-blue-700">
            All Guides
          </Link>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Industries</p>
          {topIndustries.map((industry) => (
            <Link key={industry.slug} href={`/business-types/${industry.slug}`} className="block hover:text-blue-700">
              {industry.name}
            </Link>
          ))}
          <Link href="/business-types" className="block font-medium text-blue-700 hover:text-blue-900">
            Browse all industries →
          </Link>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Trust &amp; Legal</p>
          <Link href="/about" className="block hover:text-blue-700">
            About
          </Link>
          <Link href="/editorial-methodology" className="block hover:text-blue-700">
            Editorial Methodology
          </Link>
          <Link href="/contact" className="block hover:text-blue-700">
            Contact
          </Link>
          <Link href="/affiliate-disclosure" className="block hover:text-blue-700">
            Affiliate Disclosure
          </Link>
          <Link href="/privacy" className="block hover:text-blue-700">
            Privacy
          </Link>
          <Link href="/terms" className="block hover:text-blue-700">
            Terms
          </Link>
        </div>
      </div>
    </Container>
  </footer>
);
