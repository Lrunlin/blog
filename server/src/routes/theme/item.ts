import Router from "@koa/router";
import DB from "@/db";
let router = new Router();

router.get("/theme/:id", async ctx => {
  await DB.Theme.findByPk(ctx.params.id)
    .then(row => {
      if (row) {
        ctx.body = { success: true, message: "查询成功", data: row };
      } else {
        ctx.status = 404;
        ctx.body = { success: false, message: "未找到对应主题" };
      }
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "服务器查询错误" };
    });
});
export default router;
