import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
let router = new Router();

router.get("/drafts", auth([0, 1]), async ctx => {
  await DB.Drafts.findAll({ where: { user_id: ctx.id } })
    .then(rows => {
      ctx.body = { success: true, message: "查询用户的草稿箱", data: rows };
    })
    .catch(err => {
      ctx.body = { success: false, message: "查询失败" };
      console.log(err);
    });
});
export default router;
