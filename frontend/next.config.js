/** @type {import('next').NextConfig} */

const STRAPI_URL = process.env.STRAPI_URL

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'pt-BR'],
    defaultLocale: 'en',
  },
  env:{
    CMS_PROXY:process.env.CMS_PROXY
  },
  async rewrites() {
    return [
      {
        source: '/api/cms/:path*',
        destination: `${STRAPI_URL}/:path*` // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
