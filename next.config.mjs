/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  typedRoutes: true,
  async redirects() {
    return [
      {
        source: '/guides/startup-outbound-kpi-dashboar',
        destination: '/guides/startup-outbound-kpi-dashboard',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
