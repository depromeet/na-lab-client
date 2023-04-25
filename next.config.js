const { version } = require('./package.json');
const { withSentryConfig } = require('@sentry/nextjs');

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
    forceSwcTransforms: true,
  },
  pageExtensions: ['page.tsx'],
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  sentry: {
    hideSourceMaps: true,
  },
  transpilePackages: ['react-hotjar'],
};

const sentryWebpackPluginOptions = {
  silent: true,
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
};

module.exports = () => {
  const plugins = [[withSentryConfig, sentryWebpackPluginOptions]];
  return plugins.reduce((acc, cur) => cur[0](acc, cur[1] ?? undefined), nextConfig);
};
