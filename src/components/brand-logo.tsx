import Link from 'next/link';

export const BrandLogo = ({ compact = false }: { compact?: boolean }) => (
  <Link href="/" className="group inline-flex items-center gap-2">
    <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-sm">
      <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-white/95" />
      <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-white/75" />
      <span className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-white/75" />
      <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-white/95" />
      <span className="h-3.5 w-3.5 rounded-md border border-white/90" />
    </span>
    <span className={`font-semibold text-slate-900 ${compact ? 'text-sm' : 'text-base'}`}>B2B Lead Gen Hub</span>
  </Link>
);
