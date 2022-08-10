import Router from "@koa/router";
import { cache } from "@/common/modules/cache/type";

let router = new Router();

router.get("/type", async ctx => {
  ctx.body = {
    success: true,
    message: "查看全部文章类型",
    data: cache.get("type") 
  };
});
export default router;
