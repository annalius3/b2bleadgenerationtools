import { renderApolloText } from '@/lib/render-apollo-text';
import type { GuideSectionKey } from '@/lib/guide-kind';

export function GuideSectionLead({
  eyebrow,
  title,
  body,
  section,
  tone = 'slate'
}: {
  eyebrow: string;
  title: string;
  body: string;
  section: GuideSectionKey;
  tone?: 'slate' | 'blue';
}) {
  const toneClasses = tone === 'blue'
    ? 'border-blue-100 bg-blue-50 text-blue-700'
    : 'border-slate-200 bg-slate-50 text-slate-500';

  return (
    <section data-section={section} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className={"text-xs font-semibold uppercase tracking-wide " + toneClasses}>{eyebrow}</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm text-slate-700">{renderApolloText(body)}</p>
    </section>
  );
}
