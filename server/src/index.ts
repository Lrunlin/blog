import moduleAlias from "module-alias";
import Koa from "koa";
import cors from "@koa/cors";
// 先关闭端口
import { kill } from "cross-port-killer";
//环境变量
import dotenv from "dotenv";
import http from "http";
import BodyParser from "koa-bodyparser";
import staticFiles from "koa-static";
// 变量别名
import moment from "moment";
import path from "path";
//包装app保证http和socket监听同一端口
import Routers from "./common/modules/getAllRouter";
// 执行定时任务
import start from "./common/tasks";
//socket链接
import socket from "./socket";

moduleAlias.addAlias("@", __dirname);

const originalConsoleLog = console.log;
console.log = function () {
  const stackTrace = new Error().stack as string;
  const position = stackTrace.split("\n")[2].trim(); // 提取第三行的代码位置
  originalConsoleLog(
    `${moment().format("YYYY-MM-DD HH:mm:ss")}  ${position.replace("at Server.<anonymous>", "")}`,
  );
  originalConsoleLog.apply(console, arguments as any);
};

dotenv.config({
  path: path.join(__dirname, `../.env`), // 配置文件路径
});

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
      })
      .catch((err) => {
        console.log(item, err);
      });
    if (Routers.length == index + 1) {
      const port = 3000;
      kill(port)
        .catch(() => {
          console.log(`端口3000关闭失败`);
        })
        .then(() => {
          server.listen(port, function () {
            console.log(
              `项目运行于: ${port} 端口,共${index + 1}个路由文件,${routeCount}个路由`,
            );
          });
        });
    }
  });
})();

setTimeout(() => {
  start();
}, 0);

setTimeout(() => {
  socket();
}, 0);
