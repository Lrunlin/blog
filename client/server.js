const express = require("express");
const fs = require("fs");
const next = require("next");
const redis = require("ioredis");
const env = require("./env");
const glob = require("glob");
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

// 获取除文章页面外需要渲染的路由
const routes = ["article/*"].concat(
  glob
    .sync("src/pages/**/*.tsx")
    .filter(item => {
      let _file = fs.readFileSync(item).toString();
      return (
        !_file.includes(`export const getServerSideProps:`) &&
        !_file.includes(`export let getServerSideProps:`)
      );
    })
    .map(item => item.replace("src/pages/", "").replace(".tsx", ""))
    .filter(item => !item.startsWith("_") && !item.includes("["))
    .map(item => {
      if (!item.endsWith("/index")) {
        return item;
      } else {
        let _arr = item.split("/");
        _arr.pop();
        return _arr.join("/");
      }
    })
);

/** 获取用户端请求IP*/
function getClientIp(req) {
  return (
    req?.headers["x-forwarded-for"] ||
    req?.connection.remoteAddress ||
    req?.socket.remoteAddress ||
    req?.connection.socket.remoteAddress
  );
}

/** 保存阅读记录*/
async function readingRecords(req) {
  if (!req.url.startsWith("/article/")) {
    return;
  }
  const key = req.url.replace("/article/", "");

  // 如果key可以转为NaN说民key不是数字
  if (isNaN(+key)) {
    return;
  }
  let ip = getClientIp(req).split(',')[0];
  if (
    ip &&
    !(await RedisViewHisTory.exists(`${ip}--${key}--*`)) &&
    !(await RedisViewHisTory.exists(`u--${ip}--${key}--*`))
  ) {
    RedisViewHisTory.set(`u--${ip}--${key}`, "", "EX", 604_800);
  }
}

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
  // 如果缓存中有直出的html数据，就直接将缓存内容响应给客户端
  if (await RedisHTML.exists(pagePath)) {
    res.send(await RedisHTML.get(pagePath));
    readingRecords(req);
    return;
  }
  // 如果没有当前缓存，调用renderToHTML生成直出html
  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(async html => {
      // 响应直出内容
      res.send(html);
      if (res.statusCode === 200) {
        readingRecords(req);
        if (JSON.stringify(req.query) === "{}") {
          RedisHTML.set(pagePath, html + "");
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

  //对哪些页面进行缓存
  for (const path of routes) {
    server.get(`/${path}`, (req, res) => renderAndCache(req, res));
  }
  server.get("*", (req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(`>开始运行于： http://localhost:${port}`);
  });
}
main();
