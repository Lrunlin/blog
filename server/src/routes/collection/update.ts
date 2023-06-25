import Router from "@koa/router";
import DB from "@/db";
import verify from "@/common/verify/api-verify/collection/update";
let router = new Router();
router.put("/collection/:belong_id", verify, async ctx => {
  let belong_id = +ctx.params.belong_id;

  await DB.Collection.update(
    {
      favorites_id: ctx.request.body.favorites_id,
    },
    {
      where: { belong_id: belong_id, user_id: ctx.id },
    }
  )
    .then(() => {
      ctx.body = { success: true, message: "修改成功" };
    })
    .catch(err => {
      ctx.status = 500;
      console.log(err);
    });
});
export default router;
