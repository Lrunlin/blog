import Router from "@koa/router";
import { cache } from "@/common/utils/article/modules/get-type-data";
let router = new Router();
/**
 * 将type和tag合并生成树形数组返回
 */
router.get("/type-tree", async ctx => {
  if (ctx.header.isadmin) {
    ctx.body = { success: true, message: "管理员查询文章类型", data: cache.get("tree") };
  } else {
    ctx.body = {
      success: true,
      message: "用户查询文章类型",
      data:cache.get<any[]>("tree")?.filter(item => item.children.length),
    };
  }
});
export default router;
