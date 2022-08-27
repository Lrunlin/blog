const webpack = require("webpack");
const path = require("path");
const { env } = require("process");
const envObject = require("./env/index");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ["tsx"],
  experimental: {
    plugins: true,
    scrollRestoration: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@type": path.resolve(__dirname, "./types"),
    };
    return config;
  },
  // CDN地址
  assetPrefix: env.CDN,
  // 设置缓存
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|css|js|webp)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value:
              env.NODE_ENV == "production"
                ? "public, max-age=9999999999, must-revalidate"
                : "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
  env: envObject,
};
module.exports = withBundleAnalyzer(nextConfig);
