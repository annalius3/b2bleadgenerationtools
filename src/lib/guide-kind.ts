export type GuideKind = 'review' | 'pricing' | 'tutorial' | 'strategy' | 'playbook';

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
