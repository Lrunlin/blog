import Router from "@koa/router";
import { cache } from "@/common/utils/article/modules/get-type-data";

let router = new Router();

router.get("/type", async ctx => {
  ctx.body = {
    success: true,
    message: "查看全部文章类型",
    data: cache.get("type") 
  };
});
export default router;
