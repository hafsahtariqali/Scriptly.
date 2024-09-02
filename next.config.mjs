/** @type {import('next').NextConfig} */
const nextConfig = {
  //... other configurations
  webpack: (config) => {
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    return config;
  },
};

export default nextConfig;
