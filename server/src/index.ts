import Koa from "koa";
import cors from "@koa/cors";
import http from "http";
import BodyParser from "koa-bodyparser";
import staticFiles from "koa-static";
import "./app";
import { port } from "./app";
//包装app保证http和socket监听同一端口
import Routers from "./common/modules/getAllRouter";
// 执行定时任务
import start from "./common/tasks";
//socket链接
import socket from "./socket";

const app = new Koa();

app.use(staticFiles("public"));
app.use(BodyParser());
app.use(cors());

export const server = http.createServer(app.callback()); //包装app保证http和socket监听同一端口

(async () => {
  // 用于对400状态码的Joi自定义验证的error message 进行处理
  app.use(async (ctx, next) => {
    await next();
    if (ctx.status == 400) {
      let message = ctx?.body?.message;
      if (message) {
        const match = message.match(/^Error: (.*) \(/);
        if (match && match[1]) {
          const result = match[1];
          ctx.body = Object.assign(ctx.body, { message: result });
        } else {
          ctx.body.message = ctx.body.message.replace("Error: ", "");
        }
      }
    }
  });

  let routeCount = 0;
  Routers.forEach((item, index) => {
    import(item)
      .then((_route) => {
        if (_route?.default?.routes()) {
          routeCount += _route.default.routes().router.stack.length;
          app.use(_route.default.routes());
        } else {
          console.log(item, _route.default);
        }
        if (Routers.length == index + 1) {
          server.listen(port, function () {
            console.log(
              `项目运行于: ${port} 端口,共${index + 1}个路由文件,${routeCount}个路由`,
            );
          });
        }
      })
      .catch((err) => {
        console.log(item, err);
      });
  });
})();

setTimeout(() => {
  start();
}, 0);

setTimeout(() => {
  socket();
}, 0);
