/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const path = require('path');
const {
  env
} = require('process')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
  legacyBrowsers: false, //不兼容过时浏览器
  browsersListForSwc: true,
  eslint: {
    // ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@type':path.resolve(__dirname, './types')
    };
    return config;
  },
  // CDN地址
  assetPrefix: env.NEXT_PUBLIC_ENV == 'production' ? 'https://cdn.blogweb.cn' : '',
  // 设置缓存
  async headers() {
    return [{
      source: '/:all*(svg|jpg|png|css|js|webp)',
      locale: false,
      headers: [{
        key: 'Cache-Control',
        value: env.NEXT_PUBLIC_ENV == 'production'?'public, max-age=9999999999, must-revalidate':'public, max-age=0, must-revalidate',
      }],
    }, ]
  },
  env: {
  },
})