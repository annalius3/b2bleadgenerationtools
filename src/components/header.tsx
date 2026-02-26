import Link from 'next/link';
import type { Route } from 'next';

import { ApolloButton } from '@/components/apollo-button';
import { Container } from '@/components/container';

const menu: Array<{ href: Route; label: string }> = [
  { href: '/find-clients', label: 'Find Clients' },
  { href: '/outreach', label: 'Outreach' },
  { href: '/sales-pipeline', label: 'Sales Pipeline' },
  { href: '/by-industry', label: 'By Industry' },
  { href: '/for-startups', label: 'For Startups' },
  { href: '/guides', label: 'Guides' }
];

export const Header = () => (
  <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-lg">
    <Container>
      <div className="flex h-16 items-center justify-between gap-3">
        <Link href="/" className="truncate text-sm font-semibold text-slate-900 sm:text-base">
          b2bleadgenerationtools.com
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          {menu.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-blue-700">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <ApolloButton />
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-3 lg:hidden">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </Container>
  </header>
);
