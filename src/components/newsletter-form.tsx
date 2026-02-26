'use client';

import { FormEvent, useState } from 'react';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error('subscribe_failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-lg font-semibold text-slate-900">Join the Newsletter</p>
      <p className="mt-1 text-sm text-slate-600">Weekly Apollo workflows, templates, and growth playbooks.</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-300"
        />
        <button type="submit" className="btn-primary h-11 px-5" disabled={status === 'loading'}>
          {status === 'loading' ? 'Joining...' : 'Subscribe'}
        </button>
      </div>
      {status === 'success' ? <p className="mt-2 text-sm text-emerald-700">Subscribed successfully.</p> : null}
      {status === 'error' ? <p className="mt-2 text-sm text-rose-700">Subscription failed. Try again.</p> : null}
    </form>
  );
};
