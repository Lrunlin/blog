import Router from "@koa/router";
import DB from "@/db";
import useID from "@/common/hooks/useId";
import auth from "@/common/middleware/auth";
import { verifyStateMiddleware, verifyParamsMiddleware } from "@/common/verify/create-article";

let router = new Router();
router.post("/article", auth([0, 1]), verifyStateMiddleware, verifyParamsMiddleware, async ctx => {
  let { title, description, cover_file_name, reprint, content, tag, state } = ctx.request.body;

  let id = useID();
  await DB.Article.create({
    id: id,
    title: title,
    description: description,
    cover_file_name: cover_file_name,
    reprint: reprint,
    content: content,
    author: ctx.id as number,
    tag: tag,
    state: state,
    view_count: 0,
    create_time: new Date(),
  })
    .then(res => {
      ctx.body = { success: true, message: `发布成功`, data: { article_id: id } };
    })
    .catch(err => {
      ctx.body = { success: false, message: "发布失败" };
      console.log(err);
    });
});
export default router;
