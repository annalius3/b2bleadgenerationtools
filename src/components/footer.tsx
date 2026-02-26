import Link from 'next/link';

import { Container } from '@/components/container';
import { renderApolloText } from '@/lib/render-apollo-text';

export const Footer = () => (
  <footer className="mt-20 border-t border-slate-200 bg-white/95">
    <Container>
      <div className="grid gap-8 py-12 text-sm text-slate-600 md:grid-cols-4">
        <div>
          <p className="font-semibold text-slate-900">B2B Lead Generation Authority Hub</p>
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
          <Link href="/guides" className="block hover:text-blue-700">
            Guides
          </Link>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Industries</p>
          <Link href="/by-industry/saas-companies" className="block hover:text-blue-700">
            SaaS
          </Link>
          <Link href="/by-industry/marketing-agencies" className="block hover:text-blue-700">
            Agencies
          </Link>
          <Link href="/by-industry/consulting-firms" className="block hover:text-blue-700">
            Consulting
          </Link>
          <Link href="/by-industry/it-services" className="block hover:text-blue-700">
            IT Services
          </Link>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Legal</p>
          <Link href="/privacy" className="block hover:text-blue-700">
            Privacy
          </Link>
          <Link href="/terms" className="block hover:text-blue-700">
            Terms
          </Link>
          <Link href="/affiliate-disclosure" className="block hover:text-blue-700">
            Affiliate Disclosure
          </Link>
        </div>
      </div>
    </Container>
  </footer>
);
