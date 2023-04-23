const { version } = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    WEB_VERSION: version,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: false,
  },
  pageExtensions: ['page.tsx'],
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    forceSwcTransforms: true,
  },
  transpilePackages: ['react-hotjar'],
};

module.exports = nextConfig;
