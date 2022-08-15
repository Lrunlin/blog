import type { Context, Next } from "koa";
import DB from "@/db";
import Redis from "@/common/utils/redis";

const redisClient = Redis(2);

/**
 * 缓存文章内容，并且写入阅读历史
 */
async function cache(ctx: Context, next: Next) {
  await next();
  (async () => {
    let ip = ctx.ip;
    // 有IP并且不是管理员才判断
    if (ip && !ctx.headers.isadmin && (ctx.body as any).success) {
      let articleID = ctx.path.replace("/article/", "");
      let key = ("h" + articleID + ip).replace("::ffff:", "");

      redisClient
        .exists(key)
        .then(hasKey => {
          if (!hasKey) {
            DB.Article.increment("view_count", {
              where: {
                id: articleID,
              },
            }).then(res => {
              redisClient.set(key, "", "EX", 259_200);
            });
          }
        })
        .catch(err => {
          console.log("redis写入key错误:", err);
        });
    }
  })();
}

export default cache;
