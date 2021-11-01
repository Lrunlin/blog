import {
  defineConfig
} from 'vite';
import vue from '@vitejs/plugin-vue'
const path = require('path');

export default defineConfig({
  plugins: [vue(
    //   {
    //   refTransform: true
    // }
    // 中文参考地址 https://segmentfault.com/a/1190000040685876
    // GitHub https://github.com/vuejs/rfcs/discussions/369
    // ?是否开启ref suger语法糖
    // !这个方法目前在实验阶段并且一定要Vite上使用不建议开启
  )],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  open: true, // 浏览器自动打开
  base: './', // 生产环境下的公共路径
  build: {
    chunkSizeWarningLimit:1024,//大于1mb警报
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});