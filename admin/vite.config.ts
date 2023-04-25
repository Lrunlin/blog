import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path"; // https://vitejs.dev/config/
const path = require("path");
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@type": path.resolve(__dirname, "./type"),
    },
  },
  base: "./", // 生产环境下的公共路径
  server: {
    // open: true, // 浏览器自动打开
  },
  build: {
    chunkSizeWarningLimit: 1024, //大于1mb警报
    rollupOptions: {
      output: {
        chunkFileNames: "static/[name].blog.[hash].js",
        entryFileNames: "static/[name].blog.[hash].js",
        assetFileNames: "static/[name].blog.[hash].[ext]",
      },
    },
  },
  plugins: [react()],
});
