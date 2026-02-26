export const pageview = (url: string) => {
  if (typeof window === 'undefined') return;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId || !(window as Window & { gtag?: (...args: unknown[]) => void }).gtag) return;
  (window as Window & { gtag: (...args: unknown[]) => void }).gtag('config', gaId, { page_path: url });
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
