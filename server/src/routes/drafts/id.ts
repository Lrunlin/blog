import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
let router = new Router();

router.get("/drafts/:id", auth([0, 1]), async ctx => {
  let id = ctx.params.id;
  await DB.Drafts.findOne({ where: { user_id: ctx.id, id: id } })
    .then(rows => {
      if (rows) {
        ctx.body = { success: true, message: "查询指定的超搞笑", data: rows };
      } else {
        ctx.status = 404;
        ctx.body = { success: false, message: "查询错误" };
      }
    })
    .catch(err => {
      ctx.body = { success: false, message: "查询失败" };
      console.log(err);
    });
});
export default router;
