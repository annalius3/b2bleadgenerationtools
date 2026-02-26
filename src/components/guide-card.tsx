import Link from 'next/link';

import { Icons } from '@/components/icons';
import type { Guide } from '@/lib/content';
import { renderApolloText } from '@/lib/render-apollo-text';

const iconByHub = {
  'find-clients': 'clients',
  outreach: 'outreach',
  'sales-pipeline': 'pipeline',
  'for-startups': 'revenue',
  guides: 'guide'
} as const;

export const GuideCard = ({ guide }: { guide: Guide }) => (
  <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.5)] transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_42px_-24px_rgba(37,99,235,0.35)]">
    <div className="mb-3 block">{Icons[iconByHub[guide.hub]]()}</div>
    <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{guide.hub.replace('-', ' ')}</p>
    <h3 className="mt-2 text-xl font-semibold text-slate-900 group-hover:text-blue-700">{guide.title}</h3>
    <p className="mt-3 text-sm leading-relaxed text-slate-600">{renderApolloText(guide.description)}</p>
    <div className="mt-4 border-t border-slate-100 pt-4">
      <Link href={`/guides/${guide.slug}`} className="text-sm font-semibold text-blue-700">
        Read guide
      </Link>
    </div>
  </article>
);
