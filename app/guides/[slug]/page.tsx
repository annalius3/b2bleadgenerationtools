import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import { ApolloCtaBlock } from '@/components/apollo-cta-block';
import { ArticleToc } from '@/components/article-toc';
import { Container } from '@/components/container';
import { getGuideBySlug, guides } from '@/lib/content';
import { renderApolloText } from '@/lib/render-apollo-text';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

const toc = [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution Framework' },
  { id: 'steps', label: 'Actionable Steps' },
  { id: 'use-cases', label: 'Business Use Cases' },
  { id: 'tips', label: 'Execution Tips' },
  { id: 'related', label: 'Related Guides' },
  { id: 'faq', label: 'FAQ' }
];

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return buildMetadata({
      title: 'Guide not found',
      description: 'Requested guide was not found.',
      path: '/guides'
    });
  }

  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    notFound();
  }

  const related = guide.relatedSlugs
    .map((item) => getGuideBySlug(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <Container>
      <section className="py-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">{guide.hub.replace('-', ' ')}</p>
        <h1 className="mt-2 max-w-4xl text-4xl font-semibold text-slate-900 sm:text-5xl">{guide.title}</h1>
        <p className="mt-4 max-w-3xl text-slate-700">{renderApolloText(guide.description)}</p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <Image
            src={`/images/guides/${guide.slug}-1.svg`}
            alt={`${guide.title} visual`}
            width={1400}
            height={780}
            className="h-auto w-full rounded-xl"
          />
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <article className="article-content rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <section id="problem" className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Problem</p>
            <p className="mt-2 text-sm text-slate-700">
              Most teams fail because they start campaigns before segmenting the right accounts and defining clear process ownership.
            </p>
          </section>

          <h2 id="solution">Solution Framework</h2>
          <p>
            This guide uses a simple model: identify high-fit accounts, execute repeatable outreach, and inspect pipeline outcomes weekly.
            If you need additional context, review the <Link href="/find-clients">Find Clients hub</Link> and <Link href="/outreach">Outreach hub</Link>.
          </p>

          <h2 id="steps">Actionable Steps</h2>
          <ol>
            {guide.steps.map((step) => (
              <li key={step}>{renderApolloText(step)}</li>
            ))}
          </ol>

          <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            <Image
              src={`/images/guides/${guide.slug}-2.svg`}
              alt={`${guide.title} data graphic`}
              width={1400}
              height={780}
              className="h-auto w-full rounded-xl"
            />
          </div>

          <section className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Tip Box</p>
            <p className="mt-2 text-sm text-slate-700">
              Execute this framework in weekly sprints. Shipping one focused campaign per week beats building a complex system that never launches.
            </p>
          </section>

          <h2 id="use-cases">Real Business Use Cases</h2>
          <ul>
            {guide.useCases.map((item) => (
              <li key={item}>{renderApolloText(item)}</li>
            ))}
          </ul>

          <ApolloCtaBlock title="Recommended Tool: Apollo.io - Try Free" />

          <h2 id="tips">Execution Tips</h2>
          <ul>
            {guide.tips.map((tip) => (
              <li key={tip}>{renderApolloText(tip)}</li>
            ))}
          </ul>

          <h2 id="related">Related Guides</h2>
          <ul>
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/guides/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <h2 id="faq">FAQ</h2>
          <div className="space-y-4">
            {guide.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mt-0 text-base">{faq.question}</h3>
                <p className="mt-2 text-sm text-slate-700">{renderApolloText(faq.answer)}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ArticleToc items={toc} />
          <ApolloCtaBlock />
        </aside>
      </div>
    </Container>
  );
}
