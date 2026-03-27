import { renderApolloText } from '@/lib/render-apollo-text';
import type { GuidePanel } from '@/lib/guide-kind';

export function GuideTopPanel({ panel }: { panel: GuidePanel }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{panel.label}</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900">{panel.title}</h2>
      <p className="mt-3 text-sm text-slate-700">{renderApolloText(panel.intro ?? '')}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {panel.cards?.map((card) => (
          <div key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">{card.title}</p>
            <p className="mt-2 text-sm text-slate-700">{renderApolloText(card.body)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GuideBottomPanel({ panel, body }: { panel: GuidePanel; body: string }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{panel.label}</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-900">{panel.title}</h3>
      <p className="mt-3 text-sm text-slate-700">{renderApolloText(body)}</p>
    </section>
  );
}
