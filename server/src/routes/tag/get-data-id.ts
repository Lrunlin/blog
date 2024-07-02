import Router from "@koa/router";
import DB from "@/db";
import interger from "@/common/verify/integer";

let router = new Router();
router.get("/tag/:id", interger([], ["id"]), async (ctx) => {
  let { id } = ctx.params;

  await DB.Tag.findByPk(id)
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
