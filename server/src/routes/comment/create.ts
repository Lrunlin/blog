import Router from "@koa/router";
import DB from "@/db";
import validator from "@/common/middleware/verify/validatorAsync";
import Joi from "joi";
import useId from "@/common/hooks/useId";
import authMiddleware from "@/common/middleware/auth";

const schema = Joi.object({
  article_id: Joi.number()
    .required()
    .external(async (value: number) => {
      return DB.Article.findByPk(value).then(result => {
        if (!result) {
          throw new Error("文章ID错误");
        }
      });
    })
    .error(new Error("文章ID错误")),
  reply: Joi.number()
    .required()
    .allow(null)
    .external(async (value: number | null) => {
      if (value) {
        return DB.Comment.findByPk(value).then(result => {
          if (!result) {
            throw new Error("没有找到指定的评论ID");
          }
        });
      }
    })
    .error(new Error("文章ID错误")),
  content: Joi.string().min(1).max(700).required().error(new Error("评论内容最长为600字")),
  comment_pics: Joi.string()
    .allow(null)
    .required()
    .min(15)
    .max(50)
    .lowercase()
    .pattern(/^((?!http).)*$/)
    .pattern(/^((?!,).)*$/)
    .pattern(/^((?!\/).)*$/),
});

let router = new Router();
router.post("/comment", authMiddleware(0), validator(schema), async ctx => {
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
