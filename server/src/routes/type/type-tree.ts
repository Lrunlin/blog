import Router from "@koa/router";
import { cache } from "@/common/modules/cache/type";
let router = new Router();


/**
 * 将type和tag合并生成树形数组返回
 */
router.get("/type-tree", async ctx => {
  ctx.body = { success: true, message: "管理员查询文章类型", data: cache.get("tree") };
});
export default router;
