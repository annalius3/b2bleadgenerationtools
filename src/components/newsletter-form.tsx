'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { trackEvent } from '@/lib/analytics';

const NewsletterFormInner = () => {
  const searchParams = useSearchParams();
  const subscribed = searchParams.get('subscribed') === '1';
  const error = searchParams.get('error');

  return (
    <form
      action="/api/subscribe"
      method="post"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      onSubmit={() => trackEvent('newsletter_submit', { form_location: 'homepage_newsletter' })}
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] opacity-0"
        aria-hidden="true"
      />
      <p className="text-lg font-semibold text-slate-900">Join the Newsletter</p>
      <p className="mt-1 text-sm text-slate-600">Weekly Apollo workflows, templates, and growth playbooks.</p>
      {subscribed && (
        <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
          Thanks for subscribing! Check your inbox to confirm your email.
        </p>
      )}
      {error && (
        <p className="mt-3 rounded-lg bg-rose-50 p-3 text-sm font-medium text-rose-800">
          Something went wrong. Please try again later.
        </p>
      )}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          autoComplete="email"
          className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-300"
        />
        <button type="submit" className="btn-primary h-11 px-5">
          Subscribe
        </button>
      </div>
    </form>
  );
};

export const NewsletterForm = () => (
  <Suspense fallback={null}>
    <NewsletterFormInner />
  </Suspense>
);
