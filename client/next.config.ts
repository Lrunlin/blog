import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";

const path = require("path");
const { env, buildid } = require("./env/index");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // ignoreBuildErrors: true,
  },
  experimental: {
    scrollRestoration: true,
    // reactCompiler: true,
    // ppr: true,
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
    turbo: {
    },
  },
  //https://nextjs.org/docs/app/api-reference/next-config-js/output
  output: process.env.output ? "standalone" : undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
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
        source: "/sitemap/[type]/index:path*.xml",
        destination: "/sitemap/[type]/index[index].xml",
      },
    ];
  },
  generateBuildId: () => buildid(),
  env: env,
  images: env.CDN
    ? {
        remotePatterns: [
          {
            protocol: new URL(env.CDN).protocol.replace(
              ":",
              "",
            ) as RemotePattern["protocol"], // 获取协议并去掉末尾的冒号
            hostname: new URL(env.CDN).hostname,
            pathname: "/**",
          },
        ],
      }
    : undefined,
  //解决编译时sass警告问题
  sassOptions: {
    api: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
