import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import DB from "@/db";

const schema = Joi.object({
  article_id: Joi.number()
    .required()
    .external(async (value: number) => {
      return await DB.Article.findOne({
        where: {
          id: value,
          state: 1,
        },
        attributes: ["id"],
      }).then(result => {
        if (!result) {
          throw new Error("未找打指定的文章");
        }
      });
    })
    .error(new Error("文章ID错误")),
  reply: Joi.number()
    .required()
    .allow(null)
    .external(async (value: number | null) => {
      if (value) {
        return DB.Comment.findByPk(value, { attributes: ["id"] }).then(result => {
          if (!result) {
            throw new Error("没有找到指定的评论ID");
          }
        });
      }
    })
    .error(new Error("没有找到指定的评论ID")),
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
export default validator(schema);
