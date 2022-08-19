// 变量别名
import moduleAlias from "module-alias";
moduleAlias.addAlias("@", __dirname);
//环境变量
import dotenv from "dotenv";
import path from "path";

const port = 3000;

dotenv.config({
  path: path.join(__dirname, `../.env`), // 配置文件路径
  encoding: "utf8", // 编码方式，默认utf8
  debug: false, // 是否开启debug，默认false
}).parsed;

import Koa from "koa";
import staticFiles from "koa-static";
const app = new Koa();
import BodyParser from "koa-bodyparser";

app.use(staticFiles("public"));
app.use(BodyParser());

import cors from "@koa/cors";
app.use(cors());

import getAllRouter from "@/common/modules/getAllRouter";
(async () => {
  let Routers = await getAllRouter();
  let routeCount=0;
  Routers.forEach((item, index) => {
    import(item).then(_route => {
      if (_route.default.routes()) {
        routeCount += _route.default.routes().router.stack.length;
        app.use(_route.default.routes());
      }
    });
    if (Routers.length == index + 1) {
      app.listen(port, function () {
        console.log(`项目运行于: ${port} 端口,共${index + 1}个路由文件,${routeCount}个路由`);
      });
    }
  });
})();
