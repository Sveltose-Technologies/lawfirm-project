/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  swcMinify: true,

  trailingSlash: true,


  images: {
    unoptimized: false,
    domains: ["nodejs.nrislawfirm.com"],
  },

 

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  compress: true,

  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
