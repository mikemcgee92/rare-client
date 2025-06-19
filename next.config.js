module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // Legacy domains configuration for backward compatibility
    domains: ['example.com', 'images.unsplash.com', 'via.placeholder.com', 'picsum.photos', 'localhost'],
    // Allow all external images (less secure but more flexible)
    unoptimized: false,
  },
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
