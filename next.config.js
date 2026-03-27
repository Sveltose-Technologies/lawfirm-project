/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  swcMinify: true,

  trailingSlash: true,

  images: {
    unoptimized: false,
    domains: ["https://api.bluestor.net"],
  },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  compress: true,

  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
