import Router from "@koa/router";
let router = new Router();
import verify from "@/common/verify/api-verify/problem/create";
import DB from "@/db";

router.put("/problem/:id", verify, async ctx => {
  const { title, tag, content } = ctx.request.body;
  await DB.Problem.update(
    {
      title,
      tag,
      content,
    },
    { where: { author: ctx.id } }
  )
    .then(res => {
      ctx.body = { success: true, message: "发布成功" };
    })
    .catch(err => {
      console.log(err);
      ctx.body = { success: false, message: "发布失败" };
    });
});
export default router;
