const path = require("path");
const { env, buildid } = require("./env/index");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  //https://nextjs.org/docs/app/api-reference/next-config-js/output
  output: process.env.output ? "standalone" : undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@type": path.resolve(__dirname, "./types"),
      "@axios": path.resolve(__dirname, "./src/plugin/axios.ts"),
      "@dayjs": path.resolve(__dirname, "./src/plugin/dayjs.ts"),
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
  images: env.CDN
    ? {
        remotePatterns: [
          {
            protocol: new URL(env.CDN).protocol.replace(":", ""), // 获取协议并去掉末尾的冒号
            hostname: new URL(env.CDN).hostname,
            pathname: "/**",
          },
        ],
        domains: [new URL(env.CDN).hostname],
      }
    : undefined,
};

module.exports = withBundleAnalyzer(nextConfig);
