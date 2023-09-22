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
            value: process.env.NEXT_PUBLIC_ISPRO
              ? "public, max-age=9999999999, must-revalidate"
              : "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/sitemap/index:path*.xml",
        destination: "/sitemap/index[index].xml",
      },
      {
        source: "/sitemap/:path*",
        destination: "/sitemap/[index]",
        has: [
          {
            type: "query",
            key: "index",
          },
        ],
      },
    ];
  },
  generateBuildId: () => buildid(),
  env: env,
};
module.exports = withBundleAnalyzer(nextConfig);
