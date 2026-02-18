// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
  

//   output: "export", 

//   swcMinify: false,
  
//   images: {
//     unoptimized: true, 
//     domains: ["images.unsplash.com", "images.pexels.com"],
//   },

//   eslint: { ignoreDuringBuilds: true },
//   typescript: { ignoreBuildErrors: true },
  
//   webpack: (config) => {
//     config.cache = false;
//     return config;
//   },
// };

// module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: false, // Minification issue rokne ke liye
//   trailingSlash: true, // Linux/Static server par paths ko sahi rakhne ke liye JARURI hai

//   // Image optimization band karein taaki export me error na aaye
//   images: {
//     unoptimized: true,
//     loader: 'akamai', // Next.js 12 export fix
//     path: '',
//     domains: ["images.unsplash.com", "images.pexels.com"],
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
