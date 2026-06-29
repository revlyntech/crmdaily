/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/article/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'https://cms.crmdaily.co/graphql',
      },
      {
        source: '/api/subscribe',
        destination: 'https://cms.crmdaily.co/wp-json/crmdaily/v1/subscribe',
      },
    ];
  },
  images: {
    domains: ['cms.crmdaily.co', 'images.unsplash.com'],
  },
};
export default nextConfig;
