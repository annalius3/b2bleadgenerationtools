const getGaId = () => process.env.NEXT_PUBLIC_GA_ID || 'G-NF7C5NYTC6';

export const pageview = (url: string) => {
  if (typeof window === 'undefined') return;
  const gaId = getGaId();
  if (!gaId || !(window as Window & { gtag?: (...args: unknown[]) => void }).gtag) return;
  (window as Window & { gtag: (...args: unknown[]) => void }).gtag('config', gaId, { page_path: url });
};

export const trackEvent = (eventName: string, params: Record<string, string | number | boolean | undefined> = {}) => {
  if (typeof window === 'undefined') return;
  const gaId = getGaId();
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gaId || !gtag) return;

  gtag('event', eventName, {
    page_path: window.location.pathname,
    ...params
  });
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
