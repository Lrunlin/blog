import express from "express";
import type { Response, Request } from "express";
import { kill } from "cross-port-killer";
import next from "next";
import Redis from "./redis";
const readingRecords = require("./readingRecords");
const port = 5678; //端口
const app = next({
  dev: process.env.NODE_ENV == "development",
  dir: "./",
});

let RedisHTML = Redis(1);
// 每次启动时候清空全部页面缓存
RedisHTML.flushdb();
// nextjs原生请求处理函数
const handle = app.getRequestHandler();
//渲染和处理缓存
async function renderAndCache(req: Request, res: Response) {
  let id = req.params.id;

  // 如果缓存中有直出的html数据，就直接将缓存内容响应给客户端
  if (await RedisHTML.exists(id)) {
    res.send(await RedisHTML.get(id));
    readingRecords(req);
    return;
  }

  let pagePath = req.path;
  let queryParams = req.query;
  // 如果没有当前缓存，调用renderToHTML生成直出html
  app
    .renderToHTML(req, res, pagePath, queryParams as any)
    .then(async html => {
      // 响应直出内容
      res.send(html);
      if (res.statusCode === 200) {
        RedisHTML.set(id, html as string);
        readingRecords(req);
      }
    })
    .catch(err => {
      app.renderError(err, req, res, pagePath, queryParams as any);
    });
}
async function main() {
  await app.prepare(); //准备(初始化)
  const server = express();
  //对哪些页面进行缓存
  server.get(`/article/:id`, (req, res) => renderAndCache(req, res));
  server.get("*", (req, res) => handle(req, res));
  await kill(port).catch(() => {
    console.log(`端口${port}关闭失败！`);
  });
  server.listen(port, () => {
    console.log(`>开始运行于： http://localhost:${port}`);
  });
}
main();
export {};
