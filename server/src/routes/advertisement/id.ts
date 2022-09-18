import Router from "@koa/router";
import DB from "@/db";
let router = new Router();
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";

router.get("/advertisement/:id", interger([], ["id"]), auth(), async ctx => {
  let id = ctx.params.id;
  await DB.Advertisement.findByPk(id)
    .then(row => {
      if (row) {
        ctx.body = { success: true, message: "查询指定推广内容", data: row };
      } else {
        ctx.status = 404;
        ctx.body = { success: false, message: "查询失败" };
      }
    })
    .catch(err => {
      ctx.body = { success: false, message: "查询失败" };
      console.log(err);
    });
});
export default router;
