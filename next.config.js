

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   trailingSlash: true, 
//   swcMinify: false,

//   images: {
//     unoptimized: true,
//   },

//   eslint: { ignoreDuringBuilds: true },
//   typescript: { ignoreBuildErrors: true },

//   webpack: (config) => {
//     config.cache = false;
//     return config;
//   },
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  trailingSlash: true,
  swcMinify: false,

  turbopack: {},   

  images: {
    unoptimized: true,
  },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;