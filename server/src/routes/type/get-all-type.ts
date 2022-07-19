import Router from "@koa/router";
import DB from "@/db";
import { cache } from "@/modules/cache/type";

let router = new Router();
/**
 * 将type和tag合并生成树形数组返回
 */
router.get("/type", async ctx => {
  ctx.body = {
    success: true,
    message: "查询type和tag树状结构",
    data: ctx.query.notTree ? cache.get("type") : cache.get("type/tree"),
  };
});
export default router;
