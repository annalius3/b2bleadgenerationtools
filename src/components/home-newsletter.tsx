'use client';

import dynamic from 'next/dynamic';

const NewsletterForm = dynamic(() => import('@/components/newsletter-form').then((mod) => mod.NewsletterForm), {
  ssr: false,
  loading: () => (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-lg font-semibold text-slate-900">Join the Newsletter</p>
      <p className="mt-1 text-sm text-slate-600">Weekly Apollo workflows, templates, and growth playbooks.</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50" />
        <div className="h-11 rounded-xl bg-slate-100 sm:w-32" />
      </div>
    </section>
  )
});

export function HomeNewsletter() {
  return <NewsletterForm />;
}
