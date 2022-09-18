import Router from "@koa/router";
import DB from "@/db";
import useId from "@/common/hooks/useId";
import authMiddleware from "@/common/middleware/auth";
import verify from '@/common/verify/api-verify/comment/create'

let router = new Router();
router.post("/comment",verify, authMiddleware(0), async ctx => {
  let { article_id, reply, content, comment_pics } = ctx.request.body;
  let { count } = await DB.Comment.findAndCountAll({
    where: {
      article_id,
      reply,
      content,
      comment_pics: comment_pics,
      user_id: ctx.id,
    },
  });
  if (count) {
    ctx.body = { success: true, message: "评论成功" };
    return;
  }
  await DB.Comment.create({
    id: useId(),
    article_id,
    reply,
    content,
    comment_pics,
    create_time: new Date(),
    user_id: ctx.id as number,
    is_review: 0,
    client_ip: ctx.ip,
  })
    .then(res => {
      ctx.body = { success: true, message: "评论成功" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "评论失败" };
      console.log(err);
    });
});
export default router;
