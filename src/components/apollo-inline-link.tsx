import { APOLLO_URL } from '@/lib/site';

export const ApolloInlineLink = ({ label = 'Apollo' }: { label?: string }) => (
  <a
    href={APOLLO_URL}
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2"
  >
    {label}
  </a>
);
