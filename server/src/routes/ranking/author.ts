import Router from "@koa/router";
import redis from "@/common/utils/redis";

let router = new Router();

router.get("/ranking/author", async ctx => {
  let data = await redis.get("ranking-author");

  ctx.body = {
    success: true,
    message: "查询作者榜",
    data: data ? JSON.parse(data) : [],
  };
});
export default router;
