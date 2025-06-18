module.exports = {
  reactStrictMode: true,
  // TypeScript and ESLint are handled by the CI pipeline and Husky
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Path aliases for cleaner imports
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
      '@/components': __dirname + '/components',
      '@/pages': __dirname + '/pages',
      '@/styles': __dirname + '/styles',
      '@/utils': __dirname + '/utils',
      '@/public': __dirname + '/public',
    };
    return config;
  },
};
