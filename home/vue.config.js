const PrerenderSpaPlugin = require("prerender-spa-plugin");//预渲染
const path = require("path");
module.exports = {
  publicPath: './',
  assetsDir: './home',
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        // 预渲染插件配置
        new PrerenderSpaPlugin({
          // 静态资源路径
          staticDir: path.join(__dirname, "dist"),
          // 预渲染路由
          routes: ["/"]
        })
      );
    }
  }
}