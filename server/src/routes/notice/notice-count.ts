import Router from "@koa/router";
import DB from "@/db";
import authMiddleware from "@/common/middleware/auth";

let router = new Router();
router.get("/notice/count", authMiddleware(0), async ctx => {
  await DB.Notice.findAndCountAll({ where: { user_id: ctx.id as number, is_read: 0 } })
    .then(({ count }) => {
      ctx.body = {
        success: true,
        message: "查询用户的通知数量",
        data: { count: count },
      };
    })
    .catch(() => {
      ctx.body = { success: false, message: "查询用户的通知数量失败", data: 0 };
    });
});
export default router;
