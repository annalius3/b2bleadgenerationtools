import Link from 'next/link';

import { Container } from '@/components/container';
import { BreadcrumbSchema, ItemListSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'B2B Lead Generation Glossary',
  description: 'Key terms and definitions for B2B lead generation, outbound sales, Apollo workflows, cold email, and pipeline management.',
  path: '/glossary'
});

const terms = [
  { term: 'Apollo.io', definition: 'An outbound sales platform combining a 275M+ contact database, email sequences, a built-in dialer, data enrichment, and pipeline reporting.', slug: 'what-is-apollo-io' },
  { term: 'B2B Lead Generation', definition: 'The process of identifying and attracting potential business customers who match your ideal customer profile (ICP).', slug: null },
  { term: 'Cold Email', definition: 'Unsolicited email sent to a prospect with whom you have no prior relationship, personalized to start a business conversation.', slug: null },
  { term: 'CRM (Customer Relationship Management)', definition: 'Software used to manage interactions with current and potential customers, tracking leads through the sales pipeline.', slug: null },
  { term: 'Decision-Maker', definition: 'The person within an organization who has the authority to approve a purchase or partnership decision.', slug: null },
  { term: 'Deliverability', definition: 'The ability of your emails to reach the recipient\'s inbox rather than spam or promotions folders.', slug: null },
  { term: 'Email Sequence', definition: 'A series of pre-written emails sent automatically on a schedule, designed to nurture leads through the sales process.', slug: null },
  { term: 'Enrichment', definition: 'The process of adding missing data (job title, company size, industry) to existing contact records to improve targeting.', slug: null },
  { term: 'Hub (Content Hub)', definition: 'A central page organizing related guides around a specific topic like outreach, pipeline management, or finding clients.', slug: 'find-clients' },
  { term: 'ICP (Ideal Customer Profile)', definition: 'A detailed description of the type of company and buyer most likely to benefit from your product or service.', slug: null },
  { term: 'Lead Qualification', definition: 'The process of evaluating whether a prospect matches your criteria for a viable sales opportunity.', slug: null },
  { term: 'Outbound Sales', definition: 'Proactively reaching out to potential customers through cold email, calls, LinkedIn, and other direct channels.', slug: null },
  { term: 'Pipeline', definition: 'The visual representation of your sales process, tracking leads from first contact through closed deal.', slug: null },
  { term: 'Prospecting', definition: 'The systematic process of finding and qualifying potential customers who fit your ideal customer profile.', slug: null },
  { term: 'Reply Rate', definition: 'The percentage of outreach messages that receive a response, used as a key measure of message effectiveness.', slug: null },
  { term: 'Segmentation', definition: 'Dividing your market into smaller groups based on industry, company size, role, or behavior for more targeted outreach.', slug: null },
  { term: 'Sequence', definition: 'An automated series of touchpoints (emails, calls, LinkedIn messages) designed to engage a prospect over time.', slug: null },
  { term: 'SPF/DKIM/DMARC', definition: 'Email authentication protocols that verify your identity as a sender and improve deliverability.', slug: null },
  { term: 'Taylor Made / Personalization', definition: 'Customizing outreach messages with specific details about the recipient to increase response rates.', slug: null },
  { term: 'Touchpoint', definition: 'Any interaction between your brand and a prospect, including emails, calls, LinkedIn messages, and website visits.', slug: null },
  { term: 'Trigger Event', definition: 'A specific event (funding round, hiring spike, new leadership) that signals a prospect may be ready to buy.', slug: null },
  { term: 'Value Proposition', definition: 'A clear statement explaining the specific benefit your product or service provides to the customer.', slug: null },
  { term: 'Volume vs. Fit', definition: 'The strategic choice between sending more outreach (volume) versus targeting fewer, higher-quality prospects (fit).', slug: null },
  { term: 'Warm Outreach', definition: 'Contacting prospects who have already interacted with your brand through content, events, or mutual connections.', slug: null }
];

export default function GlossaryPage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Glossary', item: `${siteConfig.url}/glossary` }
        ]}
      />
      <ItemListSchema
        name="B2B Lead Generation Glossary"
        description="Key terms and definitions for B2B lead generation, outbound sales, and Apollo workflows."
        url={`${siteConfig.url}/glossary`}
        items={terms.map((t) => ({
          name: t.term,
          url: t.slug ? `${siteConfig.url}/guides/${t.slug}` : `${siteConfig.url}/glossary#${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          description: t.definition
        }))}
      />

      <section className="py-10 sm:py-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50/55 to-cyan-50/35 p-5 shadow-[0_24px_56px_-44px_rgba(37,99,235,0.5)] sm:p-9">
          <h1 className="max-w-4xl text-3xl font-semibold text-slate-900 sm:text-5xl">B2B Lead Generation Glossary</h1>
          <p className="mt-4 max-w-3xl text-slate-700">
            Key terms and definitions for outbound sales, lead generation, Apollo workflows, and pipeline management.
            Bookmark this page for quick reference.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          {terms.map((item) => (
            <div
              key={item.term}
              id={item.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm scroll-mt-24"
            >
              <h2 className="text-lg font-semibold text-slate-900">{item.term}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.definition}</p>
              {item.slug && (
                <Link href={`/guides/${item.slug}`} className="mt-3 inline-block text-sm font-medium text-blue-700 hover:text-blue-900">
                  Read the full guide →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
