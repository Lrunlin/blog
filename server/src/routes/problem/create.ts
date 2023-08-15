import Router from "@koa/router";
let router = new Router();
import verify from "@/common/verify/api-verify/problem/create";
import DB from "@/db";
import id from "@/common/utils/id";
router.post("/problem", verify, async ctx => {
  const { title, tag, content } = ctx.request.body;
  await DB.Problem.create({
    id: id(),
    title,
    tag,
    content,
    create_time: new Date(),
    view_count: 0,
    theme_id: 0,
    author: ctx.id as number,
  })
    .then(res => {
      ctx.body = { success: true, message: "发布成功" };
    })
    .catch(err => {
      console.log(err);
      ctx.body = { success: false, message: "发布失败" };
    });
});
export default router;
