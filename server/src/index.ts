// 先关闭端口
import { kill } from "cross-port-killer";
import moment from "moment";
// 变量别名
import moduleAlias from "module-alias";
moduleAlias.addAlias("@", __dirname);

//环境变量
import dotenv from "dotenv";
import path from "path";

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

  let routeCount = 0;
  Routers.forEach((item, index) => {
    import(item)
      .then(_route => {
        if (_route?.default?.routes()) {
          routeCount += _route.default.routes().router.stack.length;
          app.use(_route.default.routes());
        } else {
          console.log(item, _route.default);
        }
      })
      .catch(err => {
        console.log(err);
      });
    if (Routers.length == index + 1) {
      const port = 3000;
      kill(3000)
        .catch(() => {
          console.log(`端口3000关闭失败`);
        })
        .then(() => {
          app.listen(port, function () {
            console.log(
              `${moment().format("YYYY-MM-DD HH:mm:ss")}: 项目运行于: ${port} 端口,共${
                index + 1
              }个路由文件,${routeCount}个路由`
            );
          });
        });
    }
  });
})();

// 执行定时任务
import start from "@/common/tasks";
setTimeout(() => {
  start();
}, 0);
