/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  swcMinify: true,

  trailingSlash: true,

  images: {
    unoptimized: false,
    // domains: ["api.blustor.net/"],
    domains: ["nrislaw.rxchartsquare.com"],
  },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  compress: true,

  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
