import { APOLLO_URL } from '@/lib/site';

export const ApolloButton = ({
  label = 'Try Apollo',
  className = ''
}: {
  label?: string;
  className?: string;
}) => (
  <a
    href={APOLLO_URL}
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    className={`inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 ${className}`}
  >
    {label}
  </a>
);
