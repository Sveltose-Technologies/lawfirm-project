/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  swcMinify: true,

  trailingSlash: true,

  images: {
    unoptimized: false,
    domains: ["api.blustor.net/"],
  },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  compress: true,

  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
