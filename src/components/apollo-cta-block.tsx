import { ApolloButton } from '@/components/apollo-button';

export const ApolloCtaBlock = ({ title = 'Recommended Tool: Apollo.io - Try Free' }: { title?: string }) => (
  <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
    <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Recommended Tool</p>
    <h3 className="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-sm text-slate-700">
      Use Apollo to find decision-makers, enrich lead data, and launch outbound sequences from one place.
    </p>
    <ApolloButton className="mt-4" label="Try Apollo Free" />
  </section>
);
