import type { Context, Next } from "koa";
import LRU from "lru-cache";
import Redis from "ioredis";
import DB from "@/db";
import { EagerLoadingError } from "sequelize/types";

const redisClient = new Redis({
  host: process.env.DB_REDIS_HOST || "127.0.0.1",
  port: process.env.DB_REDIS_PORT ? +process.env.DB_REDIS_PORT : 6379,
  password: process.env.DB_REDIS_PASSWORD,
  db: 1,
  // username: process.env.DB_REDIS_USER,
  retryStrategy: function (times) {
    return Math.min(times * 50, 5000);
  },
});
const cacheOption = new LRU({
  max: 5000,
});

/**
 * 缓存文章内容，并且写入阅读历史
 */
async function cache(ctx: Context, next: Next) {
  await next();
  let ip = ctx.ip;
  (async () => {
    // 有IP并且不是管理员才判断
    if (ip && !ctx.headers.isadmin && (ctx.body as any).success) {
      let articleID = ctx.path.replace("/article/", "");
      let key = ('h'+articleID + ip).replace('::ffff:', "");

      redisClient.exists(key).then(hasKey => {
        if (!hasKey) {
          DB.Article.increment("view_count", {
            where: {
              id: articleID,
            },
          }).then(res=>{
            redisClient.set(key, "", "EX", 259_200);
          });
        }
      }).catch(err=>{
        console.log('redis写入key错误:',err);
      });
    }
  })();
}

export default cache;
// process.env.ENV == "development"?(ctx: Context, next: Next):cache;
