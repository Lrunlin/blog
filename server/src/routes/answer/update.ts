import Router from "@koa/router";
import DB from "@/db";
import verify from "@/common/verify/api-verify/answer/update";

let router = new Router();
router.put("/answer/:id", verify, async ctx => {
  const { content } = ctx.request.body;
  const { id } = ctx.params;
  await DB.Answer.update({ content }, { where: { id, author: ctx.id } })
    .then(result => {
      if (result) {
        ctx.body = { success: true, message: "修改成功" };
      } else {
        ctx.status = 500;
      }
    })
    .catch(err => {
      ctx.status = 500;
      console.log(err);
    });
});
export default router;
