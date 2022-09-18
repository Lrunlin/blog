import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import validator from "@/common/verify/api-verify/user/update";


let router = new Router();
router.put("/user", validator, auth(0), async ctx => {
  await DB.User.update(ctx.request.body, { where: { id: ctx.id } })
    .then(([res]) => {
      ctx.body = { success: !!res, message: `成功修改${res}条数据` };
    })
    .catch(err => {
      ctx.body = { success: false, message: "更新错误" };
      console.log(err);
    });
});
export default router;
