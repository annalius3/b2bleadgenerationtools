import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { notFound } from 'next/navigation';

import { ApolloCtaBlock } from '@/components/apollo-cta-block';
import { ArticleToc } from '@/components/article-toc';
import { Container } from '@/components/container';
import { GuideBottomPanel, GuideTopPanel } from '@/components/guide-type-panels';
import { GuideSectionLead } from '@/components/guide-section-lead';
import { ArticleSchema, BreadcrumbSchema, FAQSchema, HowToSchema, ReviewSchema } from '@/components/seo-schemas';
import { getGuideBySlug, guides, hubContent, industries } from '@/lib/content';
import { guideOverrides } from '@/lib/guide-overrides';
import { buildGuidePanels, buildGuideSectionLead, buildGuideToc, buildQuickFacts, inferGuideKind, kindSpecificCopy } from '@/lib/guide-kind';
import { renderApolloText } from '@/lib/render-apollo-text';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

const hubPath: Record<(typeof guides)[number]['hub'], Route> = {
  'find-clients': '/find-clients',
  outreach: '/outreach',
  'sales-pipeline': '/sales-pipeline',
  'for-startups': '/for-startups',
  guides: '/guides'
};

const UPDATED_DATE = '2026-03-26';
const PUBLISHED_DATE = '2026-01-15';
const UPDATED_LABEL = 'March 26, 2026';

const titleCaseHub = (hub: (typeof guides)[number]['hub']) => hubContent[hub].title;

const hubSpecificCopy = (hub: (typeof guides)[number]['hub']) => {
  switch (hub) {
    case 'find-clients':
      return {
        verdict:
          'This topic matters most when the real bottleneck is account selection, list quality, or decision-maker mapping. Teams usually improve faster when they narrow the target before they increase volume.',
        drawback:
          'List building looks productive even when the underlying ICP is weak. That creates activity without qualified pipeline.',
        notFor:
          'This is not the right starting point if your offer is unclear or if you do not yet know which buyer profile closes best.',
        signals: ['High-fit account list', 'Clear role relevance', 'Clean list segmentation']
      };
    case 'outreach':
      return {
        verdict:
          'This topic matters when the list is already decent but responses are weak. In most teams, message fit and follow-up quality matter more than adding more touches.',
        drawback:
          'Outreach often fails because teams optimize around sends and opens instead of positive replies and conversation quality.',
        notFor:
          'This is not the best place to start if deliverability is already broken or if your list quality is poor.',
        signals: ['Relevant messaging', 'Tight sequence logic', 'Fast reply handling']
      };
    case 'sales-pipeline':
      return {
        verdict:
          'This topic matters when outbound is already producing conversations but the team is losing signal between first reply and real opportunity creation.',
        drawback:
          'Pipeline process work feels less exciting than prospecting, so teams often leave it vague until forecast quality becomes a problem.',
        notFor:
          'This is not the highest priority if you still have no consistent lead flow or if no one owns follow-up.',
        signals: ['Clear stage rules', 'Useful qualification criteria', 'Consistent review cadence']
      };
    case 'for-startups':
      return {
        verdict:
          'This topic matters most for lean teams that need simple outbound systems, fast feedback, and fewer moving parts.',
        drawback:
          'Startups often copy enterprise sales playbooks before they have enough signal to justify the complexity.',
        notFor:
          'This is not ideal if the product is still changing weekly or if the target customer is still uncertain.',
        signals: ['Narrow ICP', 'Fast learning loops', 'Small but qualified pipeline']
      };
    default:
      return {
        verdict:
          'This guide is best used as a practical operating playbook. The goal is not more theory. The goal is a cleaner, more repeatable workflow that improves decisions over time.',
        drawback:
          'General best-practice guides become weak when teams copy them without adapting them to their own offer and buyer context.',
        notFor:
          'This is not a substitute for offer clarity, buyer knowledge, or basic sales discipline.',
        signals: ['Clear workflow', 'Useful process checks', 'Consistent weekly review']
      };
  }
};

const buildComparisonRows = (hub: (typeof guides)[number]['hub']) => {
  switch (hub) {
    case 'find-clients':
      return [
        ['Apollo account-first prospecting', 'Teams that need fast list building with filtering', 'Low to mid', 'Best balance of speed and targeting control'],
        ['Manual research', 'Niche campaigns and high-ticket accounts', 'Low cash, high time cost', 'Good depth, low scale'],
        ['Broad database export', 'Teams optimizing only for volume', 'Varies', 'Usually weak on fit and message relevance']
      ];
    case 'outreach':
      return [
        ['Apollo sequences', 'Lean teams that need one workflow for targeting and outreach', 'Low to mid', 'Strong operating speed if lists are clean'],
        ['Manual email follow-up', 'Very small account sets', 'Low cash, high labor cost', 'Can work well, hard to scale'],
        ['Multi-tool outreach stack', 'Teams with mature ops and stricter channel separation', 'Mid to high', 'Flexible but heavier to manage']
      ];
    case 'sales-pipeline':
      return [
        ['Apollo-led outbound process', 'Teams that need top-to-mid funnel visibility', 'Low to mid', 'Strong for lean pipeline operations'],
        ['CRM-only process', 'Existing inbound-heavy teams', 'Varies', 'Useful for tracking, weak for prospecting context'],
        ['Custom enterprise process', 'Complex sales organizations', 'High', 'Powerful but slower to implement']
      ];
    default:
      return [
        ['Apollo workflow', 'Founders, agencies, and lean B2B teams', 'Low to mid', 'Fastest route to a usable outbound system'],
        ['Manual process', 'Very small volumes', 'Low cash, high time cost', 'Useful for learning, weak for consistency'],
        ['Heavier GTM stack', 'Mature teams with clear ops ownership', 'Mid to high', 'More depth, more operational drag']
      ];
  }
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
    path: `/guides/${guide.slug}`,
    type: 'article',
    image: `/images/guides/${guide.slug}-1.jpg`
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

  const sameHubGuides = guides
    .filter((item) => item.hub === guide.hub && item.slug !== guide.slug && !guide.relatedSlugs.includes(item.slug))
    .slice(0, 2);

  const crossHubGuides = guides
    .filter((item) => item.hub !== guide.hub && item.slug !== guide.slug && !guide.relatedSlugs.includes(item.slug))
    .slice(0, 2);

  const industryRefs = guide.industries
    .map((industrySlug) => industries.find((item) => item.slug === industrySlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const guideKind = inferGuideKind(guide.slug, guide.title);
  const toc = buildGuideToc(guideKind);
  const kindCopy = kindSpecificCopy(guideKind);
  const hubCopy = hubSpecificCopy(guide.hub);
  const quickFacts = buildQuickFacts(guideKind, guide.title);
  const guidePanels = buildGuidePanels(guideKind);
  const featuresLead = buildGuideSectionLead(guideKind, 'features');
  const pricingLead = buildGuideSectionLead(guideKind, 'pricing');
  const comparisonLead = buildGuideSectionLead(guideKind, 'comparison');
  const checklistLead = buildGuideSectionLead(guideKind, 'checklist');
  const override = guideOverrides[guide.slug];
  const comparisonRows = override?.comparisonRows ?? buildComparisonRows(guide.hub);
  const keywordSet = [guide.title, titleCaseHub(guide.hub), ...industryRefs.map((item) => item.name)];
  const isHowTo = guideKind === 'tutorial' || guideKind === 'playbook' || /^how to/i.test(guide.title);
  const summaryParagraphs =
    override?.summary ?? [
      hubCopy.verdict,
      `If you are working on ${titleCaseHub(guide.hub).toLowerCase()}, the best results usually come from narrower segmentation, clearer ownership, and more honest review of what is or is not working.`
    ];
  const prosList = override?.pros ?? [
    'Creates a clearer decision path instead of generic best-practice advice.',
    'Fits lean teams that need practical process improvements quickly.',
    'Connects prospecting activity to sales outcomes and follow-up discipline.'
  ];
  const consList = override?.cons ?? [
    'Will not fix weak positioning or a poorly defined offer.',
    'Needs process ownership to work consistently.',
    'Usually underperforms when teams chase volume before fit.'
  ];
  const pricingParagraphs =
    override?.pricing ?? [
      'For most teams, the main cost is not just software. It is also the operating cost of bad targeting, weak messaging, and slow follow-up. That is why list quality and campaign structure usually matter before expanding the stack.',
      'Always validate current pricing and plan limits directly on vendor sites before making a purchase decision.'
    ];
  const qualitySignals = override?.qualitySignals ?? hubCopy.signals;
  const hiddenDrawbacks =
    override?.hiddenDrawbacks ?? [
      hubCopy.drawback,
      'Internal links help users navigate, but they do not replace genuinely strong page-level depth.',
      'A process can look busy and still produce weak sales outcomes if qualification criteria are vague.'
    ];
  const whenNotParagraphs =
    override?.whenNot ?? [
      hubCopy.notFor,
      'Also pause if no one owns reply handling, list QA, or handoff into pipeline. Outbound gets expensive when execution is fragmented.'
    ];
  const scenarioParagraphs =
    override?.scenario ?? [
      'A realistic way to apply this guide is to choose one segment, one offer angle, and one next-step goal for the week. Start with the smallest useful operating loop: list quality review, message refinement, follow-up consistency, and then pipeline review.',
      'When a team changes fewer variables at once, it becomes much easier to see what is actually helping.'
    ];
  const checklistItems =
    override?.checklist ?? [
      'Define one segment, one buyer problem, and one clear offer angle.',
      'Review account fit before expanding contact volume.',
      'Map roles and next-step ownership before launch.',
      'Write one clear CTA linked to a specific business problem.',
      'Review reply quality, meeting quality, and qualification notes weekly.',
      'Document one process change at a time.',
      'Use internal links to connect this workflow to the next operational problem.',
      'Update the page when the workflow or recommendation materially changes.'
    ];
  const alternativesParagraphs =
    override?.alternatives ?? [
      `If this exact workflow is not the right fit, move one level up to the broader ${titleCaseHub(guide.hub)} hub or compare it against adjacent guides in the same cluster.`,
      'In larger deal environments, more account-based motion may be a better choice. In earlier-stage teams, a simpler founder-led version may perform better.'
    ];
  const finalVerdictParagraphs =
    override?.finalVerdict ?? [
      `This guide should help if the goal is to make ${guide.title.toLowerCase()} more repeatable and easier to inspect.`,
      'The highest-ROI move is usually not doing more. It is building a narrower, more honest workflow that the team can actually sustain and review.'
    ];

  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Guides', item: `${siteConfig.url}/guides` },
          { name: guide.title, item: `${siteConfig.url}/guides/${guide.slug}` }
        ]}
      />
      <ArticleSchema
        title={guide.title}
        description={guide.description}
        url={`${siteConfig.url}/guides/${guide.slug}`}
        image={`${siteConfig.url}/images/guides/${guide.slug}-1.jpg`}
        datePublished={PUBLISHED_DATE}
        dateModified={UPDATED_DATE}
        section={titleCaseHub(guide.hub)}
        keywords={keywordSet}
      />
      <FAQSchema questions={guide.faqs} />
      {guideKind === 'review' ? (
        <ReviewSchema
          title={guide.title}
          description={guide.description}
          url={`${siteConfig.url}/guides/${guide.slug}`}
          itemName="Apollo.io"
          image={`${siteConfig.url}/images/guides/${guide.slug}-1.jpg`}
        />
      ) : null}
      {isHowTo ? (
        <HowToSchema
          name={guide.title}
          description={guide.description}
          url={`${siteConfig.url}/guides/${guide.slug}`}
          image={`${siteConfig.url}/images/guides/${guide.slug}-1.jpg`}
          steps={guide.steps}
        />
      ) : null}

      <section className="py-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50/55 to-cyan-50/35 p-7 shadow-[0_24px_56px_-44px_rgba(37,99,235,0.5)] sm:p-9">
          <div className="pointer-events-none absolute -right-24 -top-24 h-60 w-60 rounded-full bg-blue-200/35 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-cyan-200/25 blur-3xl" />
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">{guide.hub.replace('-', ' ')}</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-semibold text-slate-900 sm:text-5xl">{guide.title}</h1>
          <p className="mt-4 max-w-3xl text-slate-700">{renderApolloText(guide.description)}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 font-medium text-slate-700">Reviewed by B2B Lead Gen Tools Editorial</span>
            <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 font-medium text-slate-700">Updated {UPDATED_LABEL}</span>
            <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 font-medium text-slate-700">{kindCopy.badge}</span>
            <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 font-medium text-slate-700">US B2B focus</span>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <Image
            src={`/images/guides/${guide.slug}-1.jpg`}
            alt={`${guide.title} visual`}
            width={1400}
            height={780}
            className="h-auto w-full rounded-xl"
            priority
          />
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <article className="article-content rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why trust this guide</p>
            <p className="mt-2 text-sm text-slate-700">
              This page was reviewed against our <Link href="/editorial-methodology">editorial methodology</Link> for search intent,
              workflow clarity, fit guidance, and internal linking. We use affiliate disclosures where relevant and avoid guaranteed claims
              about deliverability, compliance, or revenue outcomes.
            </p>
          </section>

          <section id="summary" className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Summary / Verdict</p>
            {summaryParagraphs.map((paragraph) => (
              <p key={paragraph} className="mt-2 text-sm text-slate-700">
                {renderApolloText(paragraph)}
              </p>
            ))}
          </section>

          <section className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-3">
            {quickFacts.map((fact) => (
              <div key={fact} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-medium text-slate-900">{renderApolloText(fact)}</p>
              </div>
            ))}
          </section>

          <GuideTopPanel panel={guidePanels.top} />

          <h2 id="who-for">Who this is for</h2>
          <p>
            This guide is best for B2B teams in{' '}
            {industryRefs.map((item, index) => (
              <span key={item.slug}>
                {index > 0 ? ', ' : ''}
                <Link href={`/by-industry/${item.slug}`}>{item.name}</Link>
              </span>
            ))}{' '}
            that need a clearer operating model around <strong>{guide.title.toLowerCase()}</strong>.
          </p>
          <p>
            It is especially useful when the buyer, segment, and offer are at least directionally known, but execution is still uneven.
            {` ${hubCopy.notFor}`}
          </p>

          <h2 id="features">{toc.find((item) => item.id === 'features')?.label ?? 'Key features'}</h2>
          <GuideSectionLead section="features" tone="blue" eyebrow={featuresLead.eyebrow} title={featuresLead.title} body={featuresLead.body} />
          <p>{kindCopy.featuresIntro}</p>
          <ul>
            <li>{renderApolloText(guide.steps[0] ?? 'Define a tighter target before scaling execution.')}</li>
            <li>{renderApolloText(guide.steps[1] ?? 'Use practical filtering and segmentation logic.')}</li>
            <li>{renderApolloText(guide.steps[2] ?? 'Map the right stakeholders before launching outreach.')}</li>
            <li>{renderApolloText(guide.steps[3] ?? 'Review campaign quality with operational discipline.')}</li>
            <li>{renderApolloText(guide.steps[4] ?? 'Tie activity back to pipeline quality, not vanity metrics.')}</li>
          </ul>

          <h2 id="pros-cons">Pros & Cons</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800">Pros</p>
              <ul className="mt-2 text-sm">
                {prosList.map((item) => (
                  <li key={item}>{renderApolloText(item)}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-xl border border-rose-100 bg-rose-50 p-4">
              <p className="text-sm font-semibold text-rose-800">Cons</p>
              <ul className="mt-2 text-sm">
                {consList.map((item) => (
                  <li key={item}>{renderApolloText(item)}</li>
                ))}
              </ul>
            </section>
          </div>

          <h2 id="pricing">{toc.find((item) => item.id === 'pricing')?.label ?? 'Pricing snapshot'}</h2>
          <GuideSectionLead section="pricing" eyebrow={pricingLead.eyebrow} title={pricingLead.title} body={pricingLead.body} />
          <p>{kindCopy.pricingIntro}</p>
          {pricingParagraphs.map((paragraph) => (
            <p key={paragraph}>{renderApolloText(paragraph)}</p>
          ))}

          <section id="problem" className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Problem</p>
            <p className="mt-2 text-sm text-slate-700">
              Teams often try to solve <strong>{guide.title.toLowerCase()}</strong> with more activity instead of better targeting,
              cleaner process design, and clearer next-step ownership.
            </p>
          </section>

          <h2 id="solution">Solution Framework</h2>
          <p>
            The practical framework here is straightforward: define the right segment, build a workflow that matches the buyer reality,
            then inspect the outcome weekly. If you need broader context first, start with the <Link href={hubPath[guide.hub]}>{titleCaseHub(guide.hub)}</Link>{' '}
            hub and use this page as the applied execution layer.
          </p>
          <p>
            Another thing that matters: the best teams make one strong process decision at a time. They do not change targeting, copy,
            cadence, and qualification all at once. They isolate one constraint, fix it, then review the result.
          </p>

          {override?.customSections?.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{renderApolloText(paragraph)}</p>
              ))}
            </section>
          ))}

          <h3>Internal navigation</h3>
          <ul>
            <li>
              Primary hub: <Link href={hubPath[guide.hub]}>{hubContent[guide.hub].title}</Link>
            </li>
            <li>
              Industry context:{' '}
              {industryRefs.map((item, index) => (
                <span key={item.slug}>
                  {index > 0 ? ', ' : ''}
                  <Link href={`/by-industry/${item.slug}`}>{item.name}</Link>
                </span>
              ))}
            </li>
            <li>
              Methodology: <Link href="/editorial-methodology">How we review guides</Link>
            </li>
          </ul>

          <h2 id="steps">Actionable Steps</h2>
          <ol>
            {guide.steps.map((step) => (
              <li key={step}>{renderApolloText(step)}</li>
            ))}
          </ol>

          <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            <Image
              src={`/images/guides/${guide.slug}-2.jpg`}
              alt={`${guide.title} strategy visual`}
              width={1400}
              height={780}
              className="h-auto w-full rounded-xl"
            />
          </div>

          <section className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Tip Box</p>
            <p className="mt-2 text-sm text-slate-700">{renderApolloText(guide.tips[0] ?? 'Keep the workflow narrow enough to review every week.')}</p>
          </section>

          <h2 id="use-cases">Real Business Use Cases</h2>
          <ul>
            {guide.useCases.map((item) => (
              <li key={item}>{renderApolloText(item)}</li>
            ))}
          </ul>
          <p>
            A realistic use of this workflow is not “blast more emails” or “build a bigger list.” It is usually one of these: finding a
            tighter ICP, making messages more relevant, reducing follow-up confusion, or improving how early opportunities are qualified.
          </p>

          <h2 id="comparison">{toc.find((item) => item.id === 'comparison')?.label ?? 'Comparison table'}</h2>
          <GuideSectionLead section="comparison" eyebrow={comparisonLead.eyebrow} title={comparisonLead.title} body={comparisonLead.body} />
          <p>{kindCopy.comparisonIntro}</p>
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
              {comparisonRows.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 id="benchmarks">What good looks like</h2>
          <p>
            Instead of relying on generic vanity metrics, judge this workflow against practical quality signals. If these are improving,
            the system is usually moving in the right direction.
          </p>
          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            {qualitySignals.map((signal) => (
              <div key={signal} className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-sm font-medium text-slate-900">{signal}</p>
                <p className="mt-1 text-sm text-slate-600">This should become easier to observe week by week if the process is improving.</p>
              </div>
            ))}
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
            {hiddenDrawbacks.map((item) => (
              <li key={item}>{renderApolloText(item)}</li>
            ))}
          </ul>

          <h2 id="when-not">When NOT to use this approach</h2>
          {whenNotParagraphs.map((paragraph) => (
            <p key={paragraph}>{renderApolloText(paragraph)}</p>
          ))}

          <h2 id="scenario">Real scenario walkthrough</h2>
          {scenarioParagraphs.map((paragraph) => (
            <p key={paragraph}>{renderApolloText(paragraph)}</p>
          ))}
          <p>
            If you need adjacent playbooks, compare this guide with <Link href="/find-clients">Find Clients</Link>,{' '}
            <Link href="/outreach">Outreach</Link>, <Link href="/sales-pipeline">Sales Pipeline</Link>, and{' '}
            <Link href="/for-startups">For Startups</Link>.
          </p>

          <GuideBottomPanel
            panel={guidePanels.bottom}
            body={`${guide.title} should support a cleaner ${titleCaseHub(guide.hub).toLowerCase()} workflow, not just create more activity.`}
          />

          <h2 id="checklist">{toc.find((item) => item.id === 'checklist')?.label ?? 'Implementation checklist'}</h2>
          <GuideSectionLead section="checklist" eyebrow={checklistLead.eyebrow} title={checklistLead.title} body={checklistLead.body} />
          <p>{kindCopy.checklistIntro}</p>
          <ul>
            {checklistItems.map((item) => (
              <li key={item}>{renderApolloText(item)}</li>
            ))}
          </ul>

          <h2 id="alternatives">Alternatives and strategy options</h2>
          {alternativesParagraphs.map((paragraph) => (
            <p key={paragraph}>{renderApolloText(paragraph)}</p>
          ))}

          <h2 id="related">Related Guides</h2>
          <ul>
            {related.concat(sameHubGuides).slice(0, 5).map((item) => (
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
          {finalVerdictParagraphs.map((paragraph) => (
            <p key={paragraph}>{renderApolloText(paragraph)}</p>
          ))}
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ArticleToc items={toc} />
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quick Facts</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Author: B2B Lead Gen Tools Editorial</li>
              <li>Updated: {UPDATED_LABEL}</li>
              <li>Primary hub: <Link className="hover:text-blue-700" href={hubPath[guide.hub]}>{titleCaseHub(guide.hub)}</Link></li>
              <li>Methodology: <Link className="hover:text-blue-700" href="/editorial-methodology">How we review</Link></li>
            </ul>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recommended Reads</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {related.concat(sameHubGuides, crossHubGuides).slice(0, 5).map((item) => (
                <li key={item.slug}>
                  <Link className="hover:text-blue-700" href={`/guides/${item.slug}`}>
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="hover:text-blue-700" href="/about">
                  About the editorial team
                </Link>
              </li>
            </ul>
          </section>
          <ApolloCtaBlock />
        </aside>
      </div>
    </Container>
  );
}


