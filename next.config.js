const { version } = require('./package.json');
const { withSentryConfig } = require('@sentry/nextjs');

const isProd = process.env.NODE_ENV === 'production';

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
  pageExtensions: ['page.tsx', 'page.ts'],
  swcMinify: true,
  compiler: {
    emotion: true,
    reactRemoveProperties: isProd && {
      properties: ['^data-testid'],
    },
    removeConsole: isProd && {
      exclude: ['error', 'warn'],
    },
  },
  sentry: {
    hideSourceMaps: true,
  },
  transpilePackages: ['react-hotjar'],
  images: {
    loader: 'akamai',
    path: '/',
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
};

module.exports = () => {
  const plugins = [[withSentryConfig, sentryWebpackPluginOptions]];

  return plugins.reduce((acc, cur) => cur[0](acc, cur[1] ?? undefined), nextConfig);
};
