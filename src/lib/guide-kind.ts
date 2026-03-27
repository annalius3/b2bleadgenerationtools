export type GuideKind = 'review' | 'pricing' | 'tutorial' | 'strategy' | 'playbook';

type GuidePanelCard = {
  title: string;
  body: string;
};

type GuidePanel = {
  label: string;
  title: string;
  intro?: string;
  cards?: GuidePanelCard[];
};

export const inferGuideKind = (slug: string, title: string): GuideKind => {
  const source = `${slug} ${title}`.toLowerCase();
  if (source.includes('review') || source.includes('pros-and-cons') || source.includes('worth-it')) return 'review';
  if (source.includes('pricing')) return 'pricing';
  if (source.includes('tutorial') || source.includes('setup-guide') || source.includes('for-beginners')) return 'tutorial';
  if (source.includes('strategy')) return 'strategy';
  return 'playbook';
};

export const buildGuideToc = (kind: GuideKind) => {
  const labels: Record<GuideKind, { features: string; pricing: string; comparison: string; checklist: string }> = {
    review: {
      features: 'What stands out',
      pricing: 'Pricing reality',
      comparison: 'Alternatives snapshot',
      checklist: 'Evaluation checklist'
    },
    pricing: {
      features: 'Cost drivers',
      pricing: 'Pricing breakdown',
      comparison: 'Plan comparison',
      checklist: 'Budget checklist'
    },
    tutorial: {
      features: 'What you need first',
      pricing: 'Tooling notes',
      comparison: 'Workflow options',
      checklist: 'Launch checklist'
    },
    strategy: {
      features: 'Strategic levers',
      pricing: 'Resource tradeoffs',
      comparison: 'Approach comparison',
      checklist: 'Execution checklist'
    },
    playbook: {
      features: 'Key features',
      pricing: 'Pricing snapshot',
      comparison: 'Comparison table',
      checklist: 'Implementation checklist'
    }
  };

  return [
    { id: 'summary', label: 'Summary / Verdict' },
    { id: 'who-for', label: 'Who is it for' },
    { id: 'features', label: labels[kind].features },
    { id: 'pros-cons', label: 'Pros & Cons' },
    { id: 'pricing', label: labels[kind].pricing },
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution Framework' },
    { id: 'steps', label: 'Actionable Steps' },
    { id: 'use-cases', label: 'Real business use cases' },
    { id: 'comparison', label: labels[kind].comparison },
    { id: 'benchmarks', label: 'What good looks like' },
    { id: 'tips', label: 'Execution tips' },
    { id: 'hidden-drawbacks', label: 'Hidden drawbacks' },
    { id: 'when-not', label: 'When NOT to use' },
    { id: 'scenario', label: 'Real scenario walkthrough' },
    { id: 'checklist', label: labels[kind].checklist },
    { id: 'alternatives', label: 'Alternatives' },
    { id: 'related', label: 'Related Guides' },
    { id: 'faq', label: 'FAQ' },
    { id: 'final-verdict', label: 'Final verdict' }
  ];
};

export const kindSpecificCopy = (kind: GuideKind) => {
  switch (kind) {
    case 'review':
      return {
        badge: 'Review Guide',
        featuresIntro: 'This section highlights what matters most in real use, not just feature count.',
        pricingIntro: 'Pricing matters here in terms of practical fit, not just listed plans.',
        comparisonIntro: 'A useful review should position the tool against realistic alternatives, not in isolation.',
        checklistIntro: 'Use this checklist to decide whether the tool is a good fit before you commit more time or budget.'
      };
    case 'pricing':
      return {
        badge: 'Pricing Guide',
        featuresIntro: 'These are the cost drivers and workflow levers that affect total spend most often.',
        pricingIntro: 'This section is about cost logic and plan fit, not just headline pricing.',
        comparisonIntro: 'Plan comparisons are useful only when tied to how the team actually works.',
        checklistIntro: 'Use this checklist before changing plans, adding seats, or increasing spend.'
      };
    case 'tutorial':
      return {
        badge: 'Tutorial',
        featuresIntro: 'Focus on the minimum setup and workflow pieces required to get the first result.',
        pricingIntro: 'For tutorials, the important question is usually what tooling is truly necessary to complete the workflow.',
        comparisonIntro: 'This comparison helps decide which workflow path is easiest to execute first.',
        checklistIntro: 'Use this checklist to confirm the setup is complete enough to launch and review.'
      };
    case 'strategy':
      return {
        badge: 'Strategy Guide',
        featuresIntro: 'These are the strategic levers that most change quality, focus, and operating speed.',
        pricingIntro: 'Resource tradeoffs matter here because strategy is constrained by time, budget, and team capacity.',
        comparisonIntro: 'This comparison is meant to clarify which strategic approach fits the current stage best.',
        checklistIntro: 'Use this checklist to make sure strategy turns into an executable operating plan.'
      };
    default:
      return {
        badge: 'Playbook',
        featuresIntro: 'These are the practical workflow elements that usually matter most in execution.',
        pricingIntro: 'Even in playbooks, pricing should be judged in the context of workflow efficiency and signal quality.',
        comparisonIntro: 'This comparison helps frame tradeoffs between doing it manually, using Apollo, or using a heavier stack.',
        checklistIntro: 'Use this checklist to make the workflow easier to run consistently each week.'
      };
  }
};

export const buildQuickFacts = (kind: GuideKind, title: string) => {
  switch (kind) {
    case 'review':
      return [
        'Best used to judge fit before committing to a longer workflow.',
        'Focus on tradeoffs, not feature hype.',
        `${title} should be evaluated against real alternatives, not in isolation.`
      ];
    case 'pricing':
      return [
        'Judge price in the context of workflow efficiency.',
        'Credits, seat count, and process discipline usually matter more than headline plan names.',
        'Cheaper is not better if quality drops.'
      ];
    case 'tutorial':
      return [
        'Keep the first launch narrow enough to review quickly.',
        'Aim for one working workflow, not complete feature coverage.',
        'Use the first week to learn, not to scale.'
      ];
    case 'strategy':
      return [
        'A strategy page should improve decision quality, not just activity.',
        'Segment clarity matters more than channel volume.',
        'The best strategic change is usually the one the team can sustain weekly.'
      ];
    default:
      return [
        'Use this page as an operating playbook, not just a reference document.',
        'Tighter process usually beats more volume.',
        'Weekly review is part of execution, not an optional extra.'
      ];
  }
};

export const buildGuidePanels = (kind: GuideKind) => {
  const topPanels: Record<GuideKind, GuidePanel> = {
    review: {
      label: 'Review Lens',
      title: 'How to evaluate this tool without overrating feature breadth',
      intro:
        'A strong review should help you judge fit, operating friction, and tradeoffs. The goal is not to admire the product. The goal is to decide whether it belongs in your workflow.',
      cards: [
        { title: 'Best fit', body: 'Lean B2B teams that need faster prospecting and outreach execution without building a heavy stack first.' },
        { title: 'Biggest risk', body: 'Teams often mistake fast setup for durable performance. Weak targeting still produces weak pipeline.' },
        { title: 'Real decision', body: 'Judge whether the workflow becomes cleaner, faster, and easier to inspect after rollout.' }
      ]
    },
    pricing: {
      label: 'Pricing Lens',
      title: 'What usually drives real Apollo cost',
      intro:
        'Pricing pages are most useful when they explain operational cost, not only plan names. Teams overspend more often because of weak process than because of the wrong tier.',
      cards: [
        { title: 'Cost driver', body: 'Loose segmentation burns credits and enriches contacts that never should have entered the workflow.' },
        { title: 'Budget mistake', body: 'Expanding seats before the team has one stable prospecting process usually increases noise faster than pipeline.' },
        { title: 'Good purchase logic', body: 'Buy the tier that supports one clean workflow first. Expand only when execution quality is stable.' }
      ]
    },
    tutorial: {
      label: 'Tutorial Lens',
      title: 'What needs to be true before this workflow goes live',
      intro:
        'A tutorial should reduce setup friction. The first version does not need to be complete. It only needs to be stable enough to launch, review, and improve.',
      cards: [
        { title: 'Start small', body: 'Use one segment, one offer angle, and one CTA so results are easier to interpret after the first week.' },
        { title: 'Fastest win', body: 'Get to one working list and one working sequence before exploring edge features.' },
        { title: 'Common mistake', body: 'Teams overconfigure the tool before they know whether the segment or message is good enough.' }
      ]
    },
    strategy: {
      label: 'Strategy Lens',
      title: 'What changes decision quality in this motion',
      intro:
        'Strategy content should narrow choices. The practical question is which operating lever improves outcomes most: targeting, messaging, process ownership, or review cadence.',
      cards: [
        { title: 'Primary lever', body: 'Most teams should fix account selection and role relevance before increasing outbound activity.' },
        { title: 'Constraint to watch', body: 'If no one owns qualification and reply handling, strong top-of-funnel work still stalls downstream.' },
        { title: 'Best outcome', body: 'A strategy is working when decisions get simpler and weekly execution gets more consistent.' }
      ]
    },
    playbook: {
      label: 'Playbook Lens',
      title: 'How to make this workflow usable in the real week',
      intro:
        'A playbook page should help the team execute with less confusion. That means clearer ownership, fewer moving parts, and a tighter weekly review loop.',
      cards: [
        { title: 'Best use', body: 'Treat this page as an operating reference for one workflow, not as a theory document.' },
        { title: 'Process rule', body: 'The workflow should be narrow enough that one person can explain what changed from last week.' },
        { title: 'What wins', body: 'Simple repeatable steps usually beat more channels, more tools, or more volume.' }
      ]
    }
  };

  const bottomPanels: Record<GuideKind, Omit<GuidePanel, 'intro' | 'cards'>> = {
    review: {
      label: 'Review Checklist',
      title: 'What to verify before you commit'
    },
    pricing: {
      label: 'Budget Discipline',
      title: 'How smart teams keep spend under control'
    },
    tutorial: {
      label: 'Launch Readiness',
      title: 'What to confirm before week one starts'
    },
    strategy: {
      label: 'Execution Logic',
      title: 'How to turn strategy into weekly operating rhythm'
    },
    playbook: {
      label: 'Operating Notes',
      title: 'What keeps this playbook durable over time'
    }
  };

  return {
    top: topPanels[kind],
    bottom: bottomPanels[kind]
  };
};
