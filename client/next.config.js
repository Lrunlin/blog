const path = require("path");
const buildId = require("next-build-id");
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
    scrollRestoration: true,
    legacyBrowsers: false,
  },
  //生产版本打包成独立文件夹
  // output: "standalone",
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
  assetPrefix: envObject.CDN || "",
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
              process.env.NODE_ENV == "production"
                ? "public, max-age=9999999999, must-revalidate"
                : "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
  generateBuildId: () =>
    buildId()
      .then(res => res)
      .catch(() => +new Date()+''),
  env: envObject,
};
module.exports = withBundleAnalyzer(nextConfig);
