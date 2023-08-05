import compose from "koa-compose";
import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import { typeLikeComment } from "@/common/verify/modules/type";
import authMiddleware from "@/common/middleware/auth";
import DB from "@/db";
import { Next, Context } from "koa";
import map from "@/common/utils/map";
import { fileNameAllowNull } from "../../modules/file-name";
import exist from "@/common/utils/static/exist";

const schema = Joi.object({
  belong_id: Joi.number().required().error(new Error("所属ID错误")),
  reply: Joi.number()
    .required()
    .allow(null)
    .external(async (value: number | null) => {
      if (value) {
        let result = DB.Comment.findByPk(value, { attributes: ["id"] })
          .then(res => !!res)
          .catch(err => {
            console.log(err);
            return false;
          });
        if (!result) throw new Error("没有找到指定的评论ID");
      }
    })
    .error(new Error("没有找到指定的评论ID")),
  content: Joi.string().min(1).max(700).required().error(new Error("评论内容最长为600字")),
  comment_pics: fileNameAllowNull.external(async (value: string | null) => {
    if (value) {
      let result = await exist([`comment/${value}`])
        .then(res => res)
        .catch(err => err);
      if (!result.success) throw new Error(result.message);
    }
  }),
  type: typeLikeComment,
});

async function verify(ctx: Context, next: Next) {
  let { belong_id, reply, content, comment_pics, type } = ctx.request.body;

  if (["problem", "answer"].includes(type) && comment_pics != null) {
    ctx.status = 400;
    ctx.body = { success: false, message: "问题和答案禁止回复图片" };
    return;
  }

  let row = await DB.Comment.findOne({
    where: {
      belong_id: belong_id,
      reply,
      content,
      comment_pics: comment_pics,
      user_id: ctx.id,
    },
  });

  if (row) {
    ctx.status = 400;
    ctx.body = { success: false, message: "请勿重复发表评论" };
    return;
  }

  let result = await map(type as "article" | "problem" | "answer")
    .db(belong_id)
    .then(res => !!res)
    .catch(err => {
      console.log(err);
      return false;
    });

  if (!result) {
    ctx.status = 400;
    ctx.body = { success: false, message: "未找到对应的内容" };
    return;
  }

  await next();
}

export default compose([authMiddleware(0), validator(schema), verify]);
