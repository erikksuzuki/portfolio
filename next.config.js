const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
  images: {
    domains: ['i.scdn.co', 'media.steampowered.com', 'steamcdn-a.akamaihd.net'],
    formats: ['image/avif', 'image/webp'],
  },
  redirects: async () => {
    return [
      {
        source: '/blog',
        destination: '/blog/page/1',
        permanent: true,
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig)
