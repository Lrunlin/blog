import auth from "@/common/middleware/auth";
import Router from "@koa/router";
import DB from "@/db";
let router = new Router();

// 修改评论的审阅属性
router.put("/comment", auth(), async ctx => {
  let { id }: { id: number[] } = ctx.request.body;
  
  DB.Comment.update(
    { is_review: 1 },
    {
      where: {
        id: id,
      },
    }
  );
  ctx.body = { success: true };
});
export default router;
