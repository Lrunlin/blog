import Router from "@koa/router";
import redis from "@/common/utils/redis";

let router = new Router();

// 粉丝排行榜
router.get("/ranking/funs", async (ctx) => {
  let data = await redis.get("ranking-funs");

  ctx.body = {
    success: true,
    message: "查询粉丝榜",
    data: data ? JSON.parse(data) : [],
  };
});
export default router;
