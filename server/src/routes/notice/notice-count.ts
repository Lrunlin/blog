import Router from "@koa/router";
import DB from "@/db";
import authMiddleware from "@/common/middleware/auth";

let router = new Router();
let as: { [key: string]: string } = { article_comment: "comment" };
router.get("/notice/count", authMiddleware(0), async ctx => {
  await DB.Notice.findAndCountAll({ where: { user_id: ctx.id as number, is_read: 0 } })
    .then(({ rows, count }) => {
      ctx.body = {
        success: true,
        message: "查询用户的通知数量",
        data: { count: count, notice: [...new Set(rows.map(item => as[item.type]||item.type))] },
      };
    })
    .catch(() => {
      ctx.body = { success: false, message: "查询用户的通知数量失败", data: 0 };
    });
});
export default router;
