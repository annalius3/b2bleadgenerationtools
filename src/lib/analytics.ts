const getGaId = () => process.env.NEXT_PUBLIC_GA_ID || 'G-NF7C5NYTC6';

export const pageview = (url: string) => {
  if (typeof window === 'undefined') return;
  const gaId = getGaId();
  const gtag = window.gtag;
  if (!gaId || !gtag) return;

  // Send an explicit page_view instead of re-running `config`, so the initial
  // config (send_page_view: false) plus this event yields exactly one hit.
  gtag('event', 'page_view', {
    page_location: `${window.location.origin}${url}`,
    page_path: url,
    page_title: document.title
  });
};

export const trackEvent = (eventName: string, params: Record<string, string | number | boolean | undefined> = {}) => {
  if (typeof window === 'undefined') return;
  const gaId = getGaId();
  const gtag = window.gtag;
  if (!gaId || !gtag) return;

  gtag('event', eventName, {
    page_path: window.location.pathname,
    ...params
  });
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    globalPrivacyControl?: boolean;
  }
}
