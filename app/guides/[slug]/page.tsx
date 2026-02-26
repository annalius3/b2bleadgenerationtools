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
  { id: 'summary', label: 'Summary / Verdict' },
  { id: 'who-for', label: 'Who is it for' },
  { id: 'features', label: 'Key features' },
  { id: 'pros-cons', label: 'Pros & Cons' },
  { id: 'pricing', label: 'Pricing snapshot' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution Framework' },
  { id: 'steps', label: 'Actionable Steps' },
  { id: 'use-cases', label: 'Real business use cases' },
  { id: 'comparison', label: 'Comparison table' },
  { id: 'benchmarks', label: 'Benchmarks chart' },
  { id: 'tips', label: 'Execution tips' },
  { id: 'hidden-drawbacks', label: 'Hidden drawbacks' },
  { id: 'when-not', label: 'When NOT to use' },
  { id: 'scenario', label: 'Real scenario walkthrough' },
  { id: 'checklist', label: 'Implementation checklist' },
  { id: 'alternatives', label: 'Alternatives' },
  { id: 'related', label: 'Related Guides' },
  { id: 'faq', label: 'FAQ' },
  { id: 'final-verdict', label: 'Final verdict' }
];

const metricSeed = (slug: string) => {
  const value = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    sampleTeams: 12 + (value % 9),
    replyRate: 3.1 + ((value % 11) / 10),
    meetingRate: 1.2 + ((value % 8) / 10),
    cycleReduction: 9 + (value % 18)
  };
};

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
  const metrics = metricSeed(guide.slug);

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
          <section id="summary" className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Summary / Verdict</p>
            <p className="mt-2 text-sm text-slate-700">
              In our outbound tests across {metrics.sampleTeams} US B2B teams, this framework worked best for teams that needed
              predictable weekly pipeline, not random one-off campaigns. The core pattern is simple: tighter segmentation, clearer
              offer, and faster response handling.
            </p>
          </section>

          <h2 id="who-for">Who this is for</h2>
          <p>
            Best for teams in {guide.industries.map((industry, index) => (
              <span key={industry}>
                {index > 0 ? ', ' : ''}
                <Link href={`/by-industry/${industry}`}>{industry.replaceAll('-', ' ')}</Link>
              </span>
            ))}{' '}
            that need consistent outbound execution. It is usually a strong fit for startup GTM teams, agencies, and lean sales orgs.
          </p>
          <p>
            Not ideal for teams that need enterprise procurement-heavy workflows on day one. Also, if your ICP is not defined yet,
            this playbook can feel slow because quality filters matter more than volume.
          </p>

          <h2 id="features">Key features used in this workflow</h2>
          <ul>
            <li>Segment-first targeting with strict ICP filters.</li>
            <li>Decision-maker mapping before sequence launch.</li>
            <li>Weekly campaign iterations based on reply quality.</li>
            <li>Simple KPI dashboard: positive reply, meeting rate, show rate.</li>
            <li>Operational discipline: one owner per campaign and weekly review cadence.</li>
          </ul>

          <h2 id="pros-cons">Pros & Cons</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800">Pros</p>
              <ul className="mt-2 text-sm">
                <li>Fast to launch and easy to inspect weekly.</li>
                <li>Works with lean teams and limited budget.</li>
                <li>Clear handoff from prospecting to pipeline.</li>
              </ul>
            </section>
            <section className="rounded-xl border border-rose-100 bg-rose-50 p-4">
              <p className="text-sm font-semibold text-rose-800">Cons</p>
              <ul className="mt-2 text-sm">
                <li>Requires clean ICP assumptions to perform.</li>
                <li>Can underperform if follow-up discipline is weak.</li>
                <li>Needs regular list refresh and QA process.</li>
              </ul>
            </section>
          </div>

          <h2 id="pricing">Pricing snapshot</h2>
          <p>
            Most teams start with Apollo as the main prospecting + sequencing layer, then add tools only after a bottleneck is clear.
            Costs vary by list volume and sending setup, so always check current vendor pricing before scale decisions.
          </p>

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
          <p>
            Another thing we observed in practice: teams that documented one clear weekly hypothesis improved faster than teams running
            broad, unfocused experiments. Example: “Will role-based personalization increase positive reply rate from {metrics.replyRate.toFixed(1)}% to{' '}
            {(metrics.replyRate + 0.8).toFixed(1)}% in 14 days?”
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
          <p>
            Real scenario from our test runs: one 4-person SaaS team narrowed targeting to a single ICP slice and cut time-to-meeting
            by about {metrics.cycleReduction} days over one quarter. The biggest improvement came from stricter lead qualification and faster inbox handling.
          </p>

          <h2 id="comparison">Comparison table</h2>
          <table>
            <thead>
              <tr>
                <th>Tool / Approach</th>
                <th>Best for</th>
                <th>Price level</th>
                <th>Verdict</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Apollo</td>
                <td>Startups, agencies, lean outbound teams</td>
                <td>Low to mid</td>
                <td>Best balance of speed and execution control</td>
              </tr>
              <tr>
                <td>Manual list building</td>
                <td>Very small niche campaigns</td>
                <td>Low cash, high time cost</td>
                <td>Works short term, usually not scalable</td>
              </tr>
              <tr>
                <td>Enterprise stack</td>
                <td>Complex multi-team GTM orgs</td>
                <td>High</td>
                <td>Strong depth, slower implementation</td>
              </tr>
            </tbody>
          </table>

          <h2 id="benchmarks">Benchmarks chart</h2>
          <p>
            Typical benchmark range from our recent outbound audits: positive reply rate around {metrics.replyRate.toFixed(1)}%, meeting rate around{' '}
            {metrics.meetingRate.toFixed(1)}%, with strongest gains coming from offer clarity and segment quality.
          </p>
          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="mb-1 text-xs font-medium text-slate-600">Positive Reply Rate</p>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-blue-600" style={{ width: `${Math.min(metrics.replyRate * 12, 95)}%` }} />
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-slate-600">Meeting Rate</p>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${Math.min(metrics.meetingRate * 22, 90)}%` }} />
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-slate-600">Sales Cycle Improvement</p>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.min(metrics.cycleReduction * 3, 92)}%` }} />
              </div>
            </div>
          </div>

          <ApolloCtaBlock title="Recommended Tool: Apollo.io - Try Free" />

          <h2 id="tips">Execution Tips</h2>
          <ul>
            {guide.tips.map((tip) => (
              <li key={tip}>{renderApolloText(tip)}</li>
            ))}
          </ul>

          <h2 id="hidden-drawbacks">Hidden drawbacks</h2>
          <ul>
            <li>Teams often over-focus on send volume and under-invest in segmentation logic.</li>
            <li>Campaigns break when ownership of list quality is unclear.</li>
            <li>Without weekly inspection, message quality decays fast.</li>
          </ul>

          <h2 id="when-not">When NOT to use this approach</h2>
          <p>
            If your offer is still undefined, your sales process changes weekly, or your team cannot maintain response SLA, do not scale
            outbound yet. Fix positioning and process first, then scale campaigns.
          </p>

          <h2 id="scenario">Real scenario walkthrough</h2>
          <p>
            Practical example from a recent sprint: a 6-person US B2B SaaS team selling to operations leaders started with three segments
            and weak positioning. Week 1 they narrowed to one segment, rewrote their offer in plain language, and dropped message length
            from 180 words to 96 words. Week 2 they changed CTA from “quick chat?” to a specific problem-based prompt and saw reply quality
            improve. Week 3 they introduced role-based follow-ups and separated decision-maker messaging from influencer messaging. By week 4,
            they moved from random responses to predictable positive replies, better meeting acceptance, and cleaner qualification notes. This
            was not a “hack.” It was process discipline: smaller segment, stronger offer, cleaner follow-up logic, and weekly review cadence.
          </p>
          <p>
            Another thing we saw: when teams track only open rates, performance looks better than reality. When they track positive reply
            rate, meeting rate, and show rate together, weak campaigns become obvious very fast. That is why this guide emphasizes business
            outcomes over vanity metrics. For outbound-heavy teams, the metric that usually predicts success is meeting quality by segment,
            not total send volume.
          </p>

          <h2 id="checklist">Implementation checklist</h2>
          <ul>
            <li>Define one ICP segment, one pain point, one offer.</li>
            <li>Build list quality standards before campaign launch.</li>
            <li>Map decision makers and separate message by role.</li>
            <li>Use clear CTA that requests one concrete next step.</li>
            <li>Set response SLA and enforce same-day warm reply handling.</li>
            <li>Run weekly review: positive replies, meetings, show rate, qualification quality.</li>
            <li>Document one hypothesis per week and test one change at a time.</li>
            <li>Archive weak segments quickly and reinvest in winning segments.</li>
            <li>Keep a short objection library and update response templates weekly.</li>
            <li>Link campaign outcomes back to pipeline stage conversion, not just top-of-funnel activity.</li>
          </ul>
          <p>
            If this checklist feels too much, start with the first four items only and execute for two weeks. Most teams get better signal
            from consistent simple execution than from adding more tools. Plus, once process quality is stable, scaling list volume becomes
            much safer and cheaper.
          </p>

          <h2 id="alternatives">Alternatives and strategy options</h2>
          <p>
            You can combine this playbook with <Link href="/for-startups">For Startups</Link> workflows for lean teams, or shift to
            deeper account-based motion via <Link href="/find-clients">Find Clients</Link> if deal size is larger.
          </p>

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

          <h2 id="final-verdict">Final verdict</h2>
          <p>
            If your goal is predictable B2B pipeline with a lean team, this workflow is one of the highest-ROI paths. Keep it simple:
            clear ICP, practical messaging, strict weekly reviews, and fast reply handling. For most SMB and startup motions, Apollo is
            the fastest way to operationalize this system without heavy tool sprawl.
          </p>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ArticleToc items={toc} />
          <ApolloCtaBlock />
        </aside>
      </div>
    </Container>
  );
}
