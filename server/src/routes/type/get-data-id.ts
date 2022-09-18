import Router from "@koa/router";
import DB from "@/db";
import interger from "@/common/verify/integer";

let router = new Router();
router.get(["/type/:id", "/tag/:id"], interger([], ["id"]), async ctx => {
  let { id } = ctx.params;

  let Target = ctx.path.includes("/type/") ? DB.Type : DB.Tag;
  await (Target as any)
    .findByPk(id)
    .then((row: any) => {
      let isSuccess = !!row;
      if (!isSuccess) {
        ctx.status = 404;
      }
      ctx.body = {
        success: isSuccess,
        message: isSuccess ? `查询成功` : "查询失败",
        data: row,
      };
    })
    .catch((err: any) => {
      ctx.status = 500;
      ctx.body = { success: false, message: `错误` };
      console.log(err);
    });
});
export default router;
