// 先关闭端口
import { kill } from "cross-port-killer";
import moment from "moment";
// 变量别名
import moduleAlias from "module-alias";
moduleAlias.addAlias("@", __dirname);

const originalConsoleLog = console.log;
console.log = function () {
  const stackTrace = new Error().stack as string;
  const position = stackTrace.split("\n")[2].trim(); // 提取第三行的代码位置
  originalConsoleLog(
    `${moment().format("YYYY-MM-DD HH:mm:ss")}  ${position.replace("at Server.<anonymous>", "")}`
  );
  originalConsoleLog.apply(console, arguments as any);
};

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
import http from "http";
const server = http.createServer(app.callback()); //包装app保证http和socket监听同一端口

import Routers from "@/common/modules/getAllRouter";
(async () => {
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
      kill(port)
        .catch(() => {
          console.log(`端口3000关闭失败`);
        })
        .then(() => {
          server.listen(port, function () {
            console.log(`项目运行于: ${port} 端口,共${index + 1}个路由文件,${routeCount}个路由`);
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

// import { Server } from "socket.io";
// const socketServer = new Server(server, {
//   path: "/socket", // 在这里指定自定义的路径
//   cors: {
//     origin: "*",
//   },
// });
// socketServer.use((socket, next) => {
//   if (socket.handshake.headers.authorization) {
//     jwt.verify(
//       //jsonwebtoken用看是否有被串改的method
//       socket.handshake.headers.authorization, // 包在query 禮也可以在這看到socket.handshake.query
//       "secret", //這是妳簽章的secret
//       async (err, decoded) => {
//         //認證失敗
//         if (err) {
//           return next(new Error("Authentication error"));
//         }
//         //認證成功
//         socket.decoded = decoded; // 把解出來資訊做利用
//         //。。。(看你要做啥)
//         return next();
//       }
//     );
//   }
// });

// socketServer.on("connection", socket => {
//   console.log("init");

//   // 前端建立了连接后要做什么逻辑
//   // socket.emit() 是像这个连接进来的socket 发送一个名字为message 的事件,并且附带一个对象{message:"Hello world"} 消息
//   socket.emit("message", { message: "Hello world" });
//   socket.on("receive", info => {
//     // socket.on方法,服务端监听客户端emit的事件，事件名字为 "receive", 并且接收客户端发送过来的信息
//   });
// });

// // server.listen(3000);
