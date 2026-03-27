export type GuideOverride = {
  summary?: string[];
  pros?: string[];
  cons?: string[];
  pricing?: string[];
  customSections?: Array<{ title: string; paragraphs: string[] }>;
  comparisonRows?: [string, string, string, string][];
  qualitySignals?: string[];
  hiddenDrawbacks?: string[];
  whenNot?: string[];
  scenario?: string[];
  checklist?: string[];
  alternatives?: string[];
  finalVerdict?: string[];
};

export const guideOverrides: Record<string, GuideOverride> = {
  'what-is-apollo-io': {
    summary: [
      'Apollo.io is best understood as an outbound operating platform, not just a contact database. The value is in how quickly a small team can go from target account definition to live prospecting and follow-up.',
      'For most US B2B teams, the practical question is not “does Apollo have data?” but “does Apollo reduce the number of tools and manual steps between list building and first qualified conversation?”'
    ],
    customSections: [
      {
        title: 'What Apollo actually does',
        paragraphs: [
          'Apollo combines several jobs that many teams split across separate tools: company search, contact discovery, list building, basic enrichment, sequence launch, and workflow reporting. That combination is why it is attractive to founder-led and lean SDR teams.',
          'The real advantage is operational speed. When one person can define a segment, save the list, write a sequence, and start learning from replies inside one workflow, the team usually gets to a usable outbound process faster.'
        ]
      },
      {
        title: 'Where Apollo fits in a GTM stack',
        paragraphs: [
          'Apollo usually fits between strategy and CRM. It helps teams identify the market, build prospect lists, and create first-touch outbound motion. It does not replace clear ICP thinking, offer quality, or disciplined opportunity management.',
          'For startups, it can cover more of the motion early. For mature teams, it often becomes the prospecting and top-of-funnel execution layer rather than the whole revenue system.'
        ]
      },
      {
        title: 'Who usually gets value fastest',
        paragraphs: [
          'The fastest wins usually come from teams that already know whom they should sell to and what business problem they solve. In that situation, Apollo saves time and reduces process friction.',
          'Teams with vague positioning or poor sales follow-up often overestimate the tool and underestimate the operational work required to make outbound consistent.'
        ]
      }
    ],
    finalVerdict: [
      'Apollo is worth understanding as a workflow accelerator for modern outbound teams. If your ICP is already taking shape, it can simplify list building and execution materially.',
      'If your offer is still fuzzy, learn the market first. Apollo can speed up a good process, but it cannot create one from nothing.'
    ]
  },
  'apollo-io-review-2026': {
    summary: [
      'Apollo.io remains one of the strongest options for small and mid-sized B2B teams that want one system for prospecting and outbound execution. Its biggest advantage is speed: teams can move from research to outreach without stitching together a heavy stack.',
      'The review question is not whether Apollo is perfect. It is whether the tradeoff between cost, workflow speed, and process simplicity is better than using separate data and outreach tools.'
    ],
    pros: [
      'Fast list-building and campaign execution in one workflow.',
      'Good fit for startups, agencies, and lean outbound teams.',
      'Easier to operationalize than heavier enterprise stacks.'
    ],
    cons: [
      'Data quality still varies by segment and geography.',
      'Weak process discipline can create list noise quickly.',
      'Mature teams may outgrow parts of the workflow.'
    ],
    customSections: [
      {
        title: 'Where Apollo performs best',
        paragraphs: [
          'Apollo tends to perform best when the team values speed and process simplicity more than extreme stack flexibility. Startups, agencies, and consultative sellers often benefit because one operator can manage prospecting and outreach from the same place.',
          'It is especially useful when the bottleneck is not enterprise reporting depth but getting high-fit campaigns into market quickly and learning from response patterns.'
        ]
      },
      {
        title: 'Where the review becomes more mixed',
        paragraphs: [
          'The experience becomes more mixed when a team expects the tool to replace careful segmentation, qualification discipline, or deeper account research. Apollo helps execution, but weak process design still creates noisy output.',
          'That is why the product usually looks much better in disciplined teams than in teams that over-export contacts and under-review campaign quality.'
        ]
      },
      {
        title: 'Who should compare alternatives carefully',
        paragraphs: [
          'Teams with large enterprise coverage needs, more complex routing, or stricter account-based process requirements should compare Apollo against deeper stacks before committing long term.',
          'For everyone else, Apollo is often one of the highest-value starting points because it reduces setup friction and gets operators into market faster.'
        ]
      }
    ],
    comparisonRows: [
      ['Apollo', 'Lean B2B outbound teams', 'Low to mid', 'Best all-around balance of speed and usability'],
      ['ZoomInfo-style enterprise workflow', 'Large teams with bigger budgets', 'High', 'More depth, more cost, more operational weight'],
      ['Separate database + outreach tools', 'Ops-heavy teams that want modular control', 'Mid', 'Flexible but slower to manage']
    ],
    hiddenDrawbacks: [
      'Apollo often looks better in demos than in messy real workflows where list governance is weak.',
      'Teams sometimes confuse fast setup with durable outbound performance.',
      'When sales ownership is unclear, tool convenience can hide deeper process problems.'
    ],
    finalVerdict: [
      'Apollo is one of the strongest review picks for startups and SMB outbound motions because it removes operational drag and helps teams launch faster.',
      'It is not the last tool every mature sales org will need, but it is often the right first serious outbound platform.'
    ]
  },
  'is-apollo-io-worth-it': {
    summary: [
      'Apollo is worth it when the team already has a clear buyer profile, a usable offer, and enough discipline to review what is working each week. In that context, the time saved across research, list building, and outreach can be significant.',
      'It is not worth it when the core GTM problem is still unresolved. A weak offer, unclear ICP, or poor follow-up process will make any outbound platform look worse than it actually is.'
    ],
    customSections: [
      {
        title: 'When the ROI case is strong',
        paragraphs: [
          'The ROI case is usually strongest for founder-led teams, agencies, and early SDR functions that are currently doing too much work manually. If Apollo replaces spreadsheet prospecting and fragmented workflows, the value is easier to justify.',
          'It also makes sense when one team member owns execution and needs fewer tools between market research and first outreach.'
        ]
      },
      {
        title: 'When the ROI case is weak',
        paragraphs: [
          'Apollo is a weak buy if there is no stable offer or if the team has not yet identified which segment is most likely to convert. In that case, the bottleneck is strategic clarity, not software.',
          'It is also a weak buy when the team never reviews campaign quality. Without process inspection, tool spend becomes harder to defend.'
        ]
      },
      {
        title: 'How to judge worth properly',
        paragraphs: [
          'The cleanest way to judge worth is to compare workflow speed, campaign quality, and qualified meetings before and after rollout. Revenue is the final goal, but process quality is the earlier signal.',
          'If the team is building cleaner lists, learning faster, and generating better conversations, the tool is usually earning its keep.'
        ]
      }
    ],
    whenNot: [
      'Do not buy Apollo because it feels like the next obvious growth tool. Buy it only when you already know what good execution should look like.',
      'If nobody owns outreach, qualification, or weekly reviews, solve that first.'
    ],
    finalVerdict: [
      'Apollo is often worth it for lean B2B teams because it compresses several outbound tasks into one operating layer.',
      'It is not a substitute for GTM clarity. When the motion is weak, Apollo only reveals the weakness faster.'
    ]
  },
  'apollo-io-pricing-explained': {
    summary: [
      'Apollo pricing makes the most sense when you treat cost as a workflow issue, not only a subscription issue. Teams usually overspend because their segmentation is weak, their exports are messy, or multiple people duplicate work.',
      'The headline plan matters, but the bigger cost question is whether the team uses credits and seats with enough discipline to turn activity into qualified pipeline.'
    ],
    pricing: [
      'Most teams should evaluate Apollo pricing by workflow maturity, not by feature envy. A smaller plan with better segmentation often outperforms a larger plan with weak list discipline.',
      'The practical cost drivers are seat allocation, credit burn, enrichment volume, and duplicate prospecting effort. Those are operational variables, not just billing variables.'
    ],
    customSections: [
      {
        title: 'What actually drives cost',
        paragraphs: [
          'The biggest driver is not always the plan tier. It is how many contacts a team touches without enough filtering discipline. Broad prospecting quickly turns into unnecessary credit usage.',
          'Another cost driver is duplicate work. When reps export overlapping segments or enrich records without a clear campaign owner, spend rises without improving results.'
        ]
      },
      {
        title: 'How smaller teams should think about pricing',
        paragraphs: [
          'Smaller teams should start by matching the tool to one core workflow: build list, launch campaign, qualify replies. If Apollo covers that motion well, the price is easier to justify.',
          'If the team is still experimenting with who to target, it is smarter to control workflow complexity before expanding spend.'
        ]
      },
      {
        title: 'How to keep Apollo affordable',
        paragraphs: [
          'Use tight ICP filters, clear ownership, and a short list QA process. Those three habits usually do more for cost control than plan upgrades or downgrades alone.',
          'Review spend against qualified meetings and pipeline quality, not against total sends or exports.'
        ]
      }
    ],
    hiddenDrawbacks: [
      'Teams often blame plan price when the real problem is poor prospecting discipline.',
      'Cheap-looking outbound becomes expensive if credits are wasted on low-fit records.',
      'Seat growth should follow process maturity, not optimism.'
    ],
    finalVerdict: [
      'Apollo pricing is usually reasonable for teams that use it as an operating system rather than a bulk export tool.',
      'If your workflow is messy, the platform can feel more expensive than it really is. Fix process first, then evaluate spend.'
    ]
  },
  'apollo-io-features-overview': {
    summary: [
      'Apollo has enough features to look bigger than it needs to be. The real question is which features matter at your current stage and which ones should be ignored until the core outbound motion is working.',
      'For most teams, the highest-value features are search, segmentation, list building, enrichment, and basic sequence execution. Everything else matters only if it improves decisions or saves real operating time.'
    ],
    customSections: [
      {
        title: 'Features that matter first',
        paragraphs: [
          'In early use, the most important features are the ones that improve targeting and speed to launch: account filters, contact discovery, saved lists, and sequence setup. Those create the base operating loop.',
          'If those features are used well, a small team can build more consistent prospecting without relying on a patchwork of spreadsheets and separate tools.'
        ]
      },
      {
        title: 'Features most teams overvalue',
        paragraphs: [
          'Teams often overvalue feature breadth before they have one clean segment working. Extra controls and options do not improve results when targeting and messaging are still unstable.',
          'A good rule is simple: if a feature does not improve list quality, workflow speed, or reply handling, it is probably not urgent yet.'
        ]
      },
      {
        title: 'How to prioritize features by bottleneck',
        paragraphs: [
          'If the bottleneck is list quality, focus on filters and data review. If the bottleneck is execution, focus on sequences and reply flow. If the bottleneck is handoff, focus on process consistency.',
          'Feature prioritization should follow workflow friction, not curiosity.'
        ]
      }
    ],
    finalVerdict: [
      'Apollo features are strong when used as part of a focused outbound process. The platform becomes more valuable when teams know which bottleneck they are solving.',
      'Start narrow, use the core workflow well, and expand only when the current process is stable.'
    ]
  },
  'apollo-io-pros-and-cons': {
    summary: [
      'Apollo’s strengths show up fastest in speed, consolidation, and ease of launching outbound workflows. Its weaknesses show up when teams expect software to compensate for loose targeting or weak qualification discipline.',
      'That is why the same tool can look excellent for a startup and disappointing for a badly run outbound motion. The pros and cons are real, but they are highly dependent on how the team operates.'
    ],
    pros: [
      'Reduces tool sprawl for lean outbound teams.',
      'Makes it faster to move from list building to live campaigns.',
      'Works well when one operator owns prospecting and execution.'
    ],
    cons: [
      'Can create noisy workflows if segmentation is broad.',
      'Not every team will love the tradeoff between simplicity and deeper enterprise control.',
      'Needs a quality review loop to stay effective over time.'
    ],
    customSections: [
      {
        title: 'The biggest upside',
        paragraphs: [
          'The biggest upside is operational compression. Apollo reduces the distance between account selection, contact discovery, list management, and first-touch execution. That matters a lot for smaller teams.',
          'When a team is trying to launch quickly and learn from the market, that speed advantage can outweigh the appeal of more modular but slower stacks.'
        ]
      },
      {
        title: 'The biggest downside',
        paragraphs: [
          'The biggest downside is that convenience can hide poor execution habits. Teams can export too broadly, launch too fast, and mistake motion for progress.',
          'That is why Apollo usually rewards disciplined teams more than undisciplined ones.'
        ]
      },
      {
        title: 'How to decide fairly',
        paragraphs: [
          'Judge Apollo against the specific bottleneck you are solving. If you need faster execution and simpler operations, the pros usually dominate. If you need deeper enterprise complexity, the cons matter more.',
          'A fair evaluation looks at workflow fit, not only feature count.'
        ]
      }
    ],
    finalVerdict: [
      'Apollo has a strong pros-and-cons profile for startups, agencies, and lean B2B teams because the upside is immediate and practical.',
      'It becomes a weaker fit only when the team needs complexity that the simpler workflow no longer serves well.'
    ]
  },
  'apollo-io-for-beginners': {
    summary: [
      'Apollo is beginner-friendly only when the beginner keeps the setup narrow. The product becomes much easier to learn when you focus on one ICP, one list, and one simple sequence instead of trying to build a full outbound engine immediately.',
      'Most beginner problems are not technical. They come from trying to target too many segments, writing too much copy, or changing the workflow before the first campaign has enough signal.'
    ],
    customSections: [
      {
        title: 'What beginners should do first',
        paragraphs: [
          'Start by choosing one buyer profile and one offer. Then use Apollo to build a clean list, write a simple short sequence, and review replies every day. That is enough for an effective first cycle.',
          'The goal of the first week is not scale. It is understanding how the workflow behaves in practice.'
        ]
      },
      {
        title: 'What beginners should ignore at first',
        paragraphs: [
          'Ignore feature depth that does not help you launch. You do not need every view, every filter combination, or every reporting angle in week one.',
          'Apollo is easiest when used as a direct operating tool, not a software playground.'
        ]
      },
      {
        title: 'What usually causes beginner frustration',
        paragraphs: [
          'Beginners often blame the platform when the real issue is that they started too broad. A mixed list and vague message will produce weak signal in any tool.',
          'The fix is almost always to simplify: smaller segment, cleaner list, clearer message, better reply handling.'
        ]
      }
    ],
    checklist: [
      'Choose one ICP and one business problem.',
      'Build one clean list before writing more than one sequence.',
      'Use a short message with one CTA.',
      'Review replies every day and notes every week.',
      'Change one variable at a time.'
    ],
    finalVerdict: [
      'Apollo is a solid beginner tool if the team uses it with discipline and keeps the rollout simple.',
      'The first win is not automation. It is clarity.'
    ]
  },
  'how-apollo-io-works': {
    summary: [
      'Apollo works as a sequence of operating steps: define the market, build the list, clean the data, launch outreach, handle replies, and route learning back into targeting. Teams get more value when they think of it as a workflow, not a static database.',
      'The tool works best when there is one clear owner of the campaign and one repeatable process for reviewing what happened after launch.'
    ],
    customSections: [
      {
        title: 'The real workflow inside Apollo',
        paragraphs: [
          'The workflow starts before a message is written. It begins with account selection and role relevance. If the first filters are weak, the rest of the system is forced to compensate for poor targeting.',
          'Once the list is built, Apollo helps compress the path to launch by keeping prospecting and first-touch execution close together.'
        ]
      },
      {
        title: 'Where teams usually lose performance',
        paragraphs: [
          'Most teams do not lose performance in the interface. They lose it in handoffs: low-quality lists, generic messaging, or slow reply handling. Apollo can expose these issues, but it cannot solve them automatically.',
          'That is why the best operators treat reply handling and qualification as part of the same workflow, not as a separate afterthought.'
        ]
      },
      {
        title: 'Why the loop matters',
        paragraphs: [
          'Apollo works better when the workflow is cyclical. The reply patterns from one campaign should influence segmentation, copy, and qualification rules in the next round.',
          'Without that loop, the platform becomes an execution layer without learning.'
        ]
      }
    ],
    finalVerdict: [
      'Apollo works by reducing friction between prospecting and outbound execution. That is the core reason it fits lean B2B teams so well.',
      'If you understand the workflow as a loop rather than a one-time setup, the product makes more sense and performs better.'
    ]
  },
  'apollo-io-setup-guide': {
    summary: [
      'A good Apollo setup is mostly a process decision, not a settings decision. The quality of your naming conventions, segmentation rules, and first campaign structure matters more than how many fields you configure on day one.',
      'Teams that set up Apollo cleanly tend to learn faster because their lists, sequences, and ownership stay easier to inspect.'
    ],
    customSections: [
      {
        title: 'The right setup order',
        paragraphs: [
          'Setup should follow a strict order: define ICP, create naming standards, save first account and contact segments, build one sequence template, then launch one controlled campaign. That order prevents confusion later.',
          'Most setup chaos comes from building too many assets before one workflow is actually live.'
        ]
      },
      {
        title: 'What to standardize early',
        paragraphs: [
          'Standardize list naming, sequence naming, segment definitions, and campaign ownership. These look boring, but they are what keep the workspace usable as more people touch it.',
          'If a team skips standards early, scaling usually creates reporting confusion and duplicate work.'
        ]
      },
      {
        title: 'Your first pre-launch QA',
        paragraphs: [
          'Before launch, review list fit, role relevance, message clarity, CTA specificity, and who owns warm replies. That short QA review prevents the most common first-campaign mistakes.',
          'The first launch should feel controlled, not broad.'
        ]
      }
    ],
    checklist: [
      'Define ICP before building lists.',
      'Set naming rules for lists and sequences.',
      'Create one campaign owner.',
      'Run a short QA checklist before launch.',
      'Review results within the first week.'
    ],
    finalVerdict: [
      'Apollo setup is straightforward when the team uses it to support one real workflow instead of building everything at once.',
      'The setup that wins is usually the simplest setup the team can review consistently.'
    ]
  },
  'apollo-io-tutorial-step-by-step': {
    summary: [
      'The best Apollo tutorial is not one that shows every feature. It is one that gets a team from first segment to first qualified conversation with as little noise as possible.',
      'A useful tutorial should teach order of operations: who to target, how to build the list, how to message the segment, and how to judge the first round of results.'
    ],
    customSections: [
      {
        title: 'Day one tutorial path',
        paragraphs: [
          'On day one, the tutorial should end with one usable campaign, not just a configured workspace. That means one target segment, one list, one sequence, and one review routine.',
          'Anything beyond that is optional until the first campaign produces enough signal to interpret.'
        ]
      },
      {
        title: 'What to learn in week one',
        paragraphs: [
          'Week one is about signal quality. Are the accounts relevant? Are the contacts appropriate? Is the message getting the right kind of reply? Those answers matter more than maximizing activity volume.',
          'A good tutorial makes those review questions explicit.'
        ]
      },
      {
        title: 'When the tutorial becomes a system',
        paragraphs: [
          'The tutorial becomes a real system once the team can repeat the process with another segment without rebuilding everything from scratch.',
          'That is when Apollo stops being “new software” and starts becoming part of the operating model.'
        ]
      }
    ],
    finalVerdict: [
      'A strong Apollo tutorial should create a repeatable first workflow, not just familiarity with the UI.',
      'If the team leaves with one clear process and one clear review rhythm, the tutorial did its job.'
    ]
  }
};

