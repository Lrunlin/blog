const express = require("express");
const next = require("next");
const redis = require("ioredis");

const port = 5678; //端口
const app = next({
  dev: process.env.NODE_ENV == "development",
});

const Redis = db => {
  return new redis({
    host: process.env.DB_REDIS_HOST || "127.0.0.1",
    port: process.env.DB_REDIS_PORT ? +process.env.DB_REDIS_PORT : 6379,
    password: process.env.DB_REDIS_PASSWORD,
    db: db,
    // username: process.env.DB_REDIS_USER,
    retryStrategy: function (times) {
      return Math.min(times * 50, 5000);
    },
  });
};

let RedisHTML = Redis(1);
let RedisViewHisTory = Redis(2);

// 每次启动时候清空全部页面缓存
RedisHTML.flushdb();

// nextjs原生请求处理函数
const handle = app.getRequestHandler();

//渲染和处理缓存
async function renderAndCache(req, res) {
  let pagePath = req.path;
  let queryParams = req.query;
  const key = req.url.replace("/article/", "");
  // 如果缓存中有直出的html数据，就直接将缓存内容响应给客户端
  if (await RedisHTML.exists(key)) {
    res.send(await RedisHTML.get(key));

    // 记录阅读记录
    // 有IP并且没有保存的
    if (
      req.ip &&
      !(await RedisViewHisTory.exists(`${req.ip}----${key}`)) &&
      !(await RedisViewHisTory.exists(`unrecorded-${req.ip}----${key}`))
    ) {
      RedisViewHisTory.set(`unrecorded--${req.ip}----${key}`, "", "EX", 432_000);
    }
    return;
  }
  // 如果没有当前缓存，调用renderToHTML生成直出html
  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(async html => {
      if (res.statusCode === 200) {
        RedisHTML.set(key, html + "", "EX", 999999999);
      } else {
        RedisHTML.del(key);
      }
      // 响应直出内容
      res.send(html);

      //设置历史记录
      if (
        req.ip &&
        !(await RedisViewHisTory.exists(`${req.ip}----${key}`)) &&
        !(await RedisViewHisTory.exists(`unrecorded-${req.ip}----${key}`))
      ) {
        RedisViewHisTory.set(`unrecorded--${req.ip}----${key}`, "", "EX", 432_000);
      }
      return;
    })
    .catch(err => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
}
async function main() {
  await app.prepare(); //准备(初始化)

  const server = express();
  server.listen(port, () => {
    console.log(`>开始运行于： http://localhost:${port}`);
  });

  //对哪些页面进行缓存
  server.get("/article/*", (req, res) => renderAndCache(req, res));
  server.get("*", (req, res) => handle(req, res));
}
main();
