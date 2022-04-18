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
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
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
        value: 'public, max-age=9999999999, must-revalidate',
      }],
    }, ]
  },
  // 公共变量
  publicRuntimeConfig: {
    // 静态文件缓存时间戳，在项目重启时候才会变
    v: +new Date(),
  }
})