import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/problem/create";

let router = new Router();
router.post("/problem", verify, async (ctx) => {
  let _id = id();
  const { title, tag, content } = ctx.request.body;
  await DB.Problem.create({
    id: _id,
    title,
    tag,
    content,
    create_time: new Date(),
    view_count: 0,
    theme_id: 0,
    author: ctx.id as number,
  })
    .then((res) => {
      ctx.body = { success: true, message: "发布成功", data: _id };
    })
    .catch((err) => {
      console.log(err);
      ctx.body = { success: false, message: "发布失败" };
    });
});
export default router;
