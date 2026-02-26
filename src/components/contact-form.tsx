'use client';

import { FormEvent, useState } from 'react';

export const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    website: ''
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('contact_failed');
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '', website: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xl font-semibold text-slate-900">Contact Us</p>
      <p className="text-sm text-slate-600">Questions, partnership requests, or editorial feedback.</p>
      <input
        value={form.name}
        onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        placeholder="Name"
        required
        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:border-blue-300"
      />
      <input
        value={form.email}
        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        type="email"
        placeholder="Email"
        required
        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:border-blue-300"
      />
      <input
        value={form.company}
        onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
        placeholder="Company (optional)"
        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:border-blue-300"
      />
      <textarea
        value={form.message}
        onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
        placeholder="Message"
        required
        rows={5}
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-300"
      />
      <input
        value={form.website}
        onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button type="submit" className="btn-primary w-full" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' ? <p className="text-sm text-emerald-700">Message sent.</p> : null}
      {status === 'error' ? <p className="text-sm text-rose-700">Message failed. Try again.</p> : null}
    </form>
  );
};
