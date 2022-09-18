import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";

let router = new Router();

router.delete("/advertisement/:id", interger([], ["id"]), auth(), async ctx => {
  await DB.Advertisement.destroy({ where: { id: ctx.params.id } })
    .then(rows => {
      if (rows) {
        ctx.body = { success: true, message: "删除成功" };
      } else {
        ctx.body = { success: false, message: "删除失败" };
      }
    })
    .catch(err => {
      ctx.body = { success: false, message: "删除失败" };
    });
});
export default router;
