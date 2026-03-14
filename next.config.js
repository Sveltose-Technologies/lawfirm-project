/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  swcMinify: true,

  trailingSlash: true,

  images: {
    unoptimized: false,
    domains: ["nodejs.bluestor.net"],
  },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  compress: true,

  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
