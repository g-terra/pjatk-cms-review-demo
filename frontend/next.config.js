/** @type {import('next').NextConfig} */

const STRAPI_URL = process.env.STRAPI_URL

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'pt-BR'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/cms/resources/**',
      },
    ],
  },
  env:{
    CMS_PROXY:process.env.CMS_PROXY,
    CMS_RESOURCES:process.env.CMS_RESOURCES,

  },
  async rewrites() {
    return [
      {
        source: '/api/cms/:path*',
        destination: `${STRAPI_URL}/${process.env.STRAPI_API_PATH}/:path*` // Proxy to Backend
      },
      {
        source: '/cms/resources/:path*',
        destination: `${STRAPI_URL}/:path*` // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
