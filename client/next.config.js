/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.blogweb.cn' : '',
  async headers() {
    return [{
      source: '/:all*(svg|jpg|png|css|js|webp)',
      locale: false,
      headers: [{
        key: 'Cache-Control',
        value: 'public, max-age=9999999999, must-revalidate',
      }],
    }, ]
  },
})