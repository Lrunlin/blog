import Router from "@koa/router";
import DB from "@/db";
import verify from "@/common/verify/api-verify/problem/create";

let router = new Router();

router.put("/problem/:id", verify, async (ctx) => {
  const { title, tag, content } = ctx.request.body;
  await DB.Problem.update(
    {
      title,
      tag,
      content,
    },
    { where: { author: ctx.id, id: ctx.params.id } },
  )
    .then((res) => {
      ctx.body = { success: true, message: "发布成功" };
    })
    .catch((err) => {
      console.log(err);
      ctx.body = { success: false, message: "发布失败" };
    });
});
export default router;
