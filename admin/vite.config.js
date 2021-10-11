import {
  defineConfig
} from 'vite';
import vue from '@vitejs/plugin-vue'
const path = require('path');

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  open: true, // 浏览器自动打开
  base: './', // 生产环境下的公共路径
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});