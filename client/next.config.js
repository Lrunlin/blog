const path = require("path");
const { env, buildid } = require("./env/index");
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
  swcMinify: false, //不要关 否则表情选择器会打包出问题
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
  assetPrefix: env.CDN || "",
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
  generateBuildId: () => buildid(),
  env: env,
};
module.exports = withBundleAnalyzer(nextConfig);
