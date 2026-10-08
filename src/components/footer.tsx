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
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Resources</p>
          <Link href="/guides" className="flex min-h-[48px] items-center hover:text-blue-700 md:block md:min-h-0">
            All Guides
          </Link>
          <Link href="/compare" className="flex min-h-[48px] items-center hover:text-blue-700 md:block md:min-h-0">
            Tool Comparisons
          </Link>
          <Link href="/glossary" className="flex min-h-[48px] items-center hover:text-blue-700 md:block md:min-h-0">
            Glossary
          </Link>
          <Link href="/editorial-methodology" className="flex min-h-[48px] items-center hover:text-blue-700 md:block md:min-h-0">
            Editorial Methodology
          </Link>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Industries</p>
          {topIndustries.map((industry) => (
            <Link key={industry.slug} href={`/business-types/${industry.slug}`} className="flex min-h-[48px] items-center hover:text-blue-700 md:block md:min-h-0">
              {industry.name}
            </Link>
          ))}
          <Link href="/business-types" className="flex min-h-[48px] items-center font-medium text-blue-700 hover:text-blue-900 md:block md:min-h-0">
            Browse all industries →
          </Link>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Trust &amp; Legal</p>
          <Link href="/about" className="flex min-h-[48px] items-center hover:text-blue-700 md:block md:min-h-0">
            About
          </Link>
          <Link href="/editorial-methodology" className="flex min-h-[48px] items-center hover:text-blue-700 md:block md:min-h-0">
            Editorial Methodology
          </Link>
          <Link href="/contact" className="flex min-h-[48px] items-center hover:text-blue-700 md:block md:min-h-0">
            Contact
          </Link>
          <Link href="/affiliate-disclosure" className="flex min-h-[48px] items-center hover:text-blue-700 md:block md:min-h-0">
            Affiliate Disclosure
          </Link>
          <Link href="/privacy" className="flex min-h-[48px] items-center hover:text-blue-700 md:block md:min-h-0">
            Privacy
          </Link>
          <Link href="/terms" className="flex min-h-[48px] items-center hover:text-blue-700 md:block md:min-h-0">
            Terms
          </Link>
        </div>
      </div>
    </Container>
  </footer>
);
