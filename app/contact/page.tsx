import Link from 'next/link';

import { Container } from '@/components/container';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Contact B2B Lead Generation Tools for advertising, partnerships, and collaboration requests.',
  path: '/contact'
});

export default function ContactPage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Contact', item: `${siteConfig.url}/contact` }
        ]}
      />
      <section className="py-10">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.28)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Contact</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Advertising and partnership inquiries</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            For advertising opportunities, affiliate partnerships, sponsored placements, business collaboration, and all other commercial inquiries, email us directly.
          </p>
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Email</p>
            <Link href="mailto:vladkatintam@gmail.com" className="mt-2 inline-flex text-lg font-semibold text-sky-700 transition hover:text-sky-900">
              vladkatintam@gmail.com
            </Link>
          </div>
          <div className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
            <p>
              Please include a short summary of your request, your company name, and the type of cooperation you are interested in so we can review it faster.
            </p>
            <p>
              We review inquiries related to advertising, sponsored content, affiliate partnerships, content collaboration, and strategic business cooperation.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
