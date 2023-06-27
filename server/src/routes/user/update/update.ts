import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import validator from "@/common/verify/api-verify/user/update";

let router = new Router();
router.put("/user", validator, auth(0), async ctx => {
  await DB.User.update(ctx.request.body, { where: { id: ctx.id } })
    .then(() => {
      ctx.body = { success: true, message: "修改成功" };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "更新错误" };
      console.log(err);
    });
});
export default router;
