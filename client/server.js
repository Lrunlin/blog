const express = require("express");
const next = require("next");
const redis = require("ioredis");
const env = require("./env");

const port = 5678; //端口
const app = next({
  dev: process.env.NODE_ENV == "development",
});

const Redis = db => {
  return new redis({
    host: env.REDIS_HOST || "127.0.0.1",
    port: env.REDIS_PORT ? +env.REDIS_PORT : 6379,
    password: env.REDIS_PASSWORD,
    db: db,
    username: env.REDIS_USER,
    retryStrategy: function (times) {
      return Math.min(times * 50, 5000);
    },
  });
};

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  );
}

let RedisHTML = Redis(1);
let RedisViewHisTory = Redis(2);

// 每次启动时候清空全部页面缓存
RedisHTML.flushdb();

// nextjs原生请求处理函数
const handle = app.getRequestHandler();

//渲染和处理缓存
async function renderAndCache(req, res) {
  let ip = getClientIp(req);
  let pagePath = req.path;
  let queryParams = req.query;
  const key = req.url.replace("/article/", "");
  // 如果缓存中有直出的html数据，就直接将缓存内容响应给客户端
  if (await RedisHTML.exists(key)) {
    res.send(await RedisHTML.get(key));

    // 记录阅读记录
    // 有IP并且没有保存的
    if (
      ip &&
      !(await RedisViewHisTory.exists(`${ip}----${key}`)) &&
      !(await RedisViewHisTory.exists(`unrecorded-${ip}----${key}`))
    ) {
      RedisViewHisTory.set(`unrecorded--${ip}----${key}`, "", "EX", 432_000);
    }
    return;
  }
  // 如果没有当前缓存，调用renderToHTML生成直出html
  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(async html => {
      // 响应直出内容
      res.send(html);
      
      if (res.statusCode === 200) {
        RedisHTML.set(key, html + "");
        //设置历史记录
        if (
          ip &&
          !(await RedisViewHisTory.exists(`${ip}----${key}`)) &&
          !(await RedisViewHisTory.exists(`unrecorded-${ip}----${key}`))
        ) {
          RedisViewHisTory.set(`unrecorded--${ip}----${key}`, "", "EX", 432_000);
        }
      }
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
