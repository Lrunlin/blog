import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
let router = new Router();

router.delete("/external-link/:id", auth(), async ctx => {
  await DB.ExternalLink.destroy({ where: { id: ctx.params.id } })
    .then(rows => {
      if (rows) {
        ctx.body = { success: true, message: "删除成功" };
      } else {
        ctx.status = 500;
        ctx.body = { success: false, message: "删除失败" };
      }
    })
    .catch(err => {
      console.log(err);
      ctx.status = 500;
      ctx.body = { success: false, message: "删除失败" };
    });
});
export default router;
