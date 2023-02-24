import compose from "koa-compose";
import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import authMiddleware from "@/common/middleware/auth";
import DB from "@/db";
import { Next, Context } from "koa";

/** 确定问题的所属权*/
async function verifyId(ctx: Context, next: Next) {
  const schema = Joi.object({
    id: Joi.number()
      .min(0)
      .required()
      .external(async (value: number) => {
        let result = await DB.Problem.findOne({ where: { id: value, author: ctx.id } })
          .then(res => !!res)
          .catch(err => {
            console.log(err);
            return false;
          });
        if (!result) throw new Error("验证问题ID时出现错误");
        return value;
      })
      .error(new Error("问题ID错误")),
  });
  return validator(schema, true)(ctx, next);
}

/** 验证答案ID与问题是否匹配(答案是否所属于问题)*/
async function verifyAnswerId(ctx: Context, next: Next) {
  const schema = Joi.object({
    answer_id: Joi.number()
      .min(0)
      .required()
      .external(async (value: number) => {
        let result = await DB.Answer.findOne({ where: { id: value, problem_id: ctx.params.id } })
          .then(res => !!res)
          .catch(err => {
            console.log(err);
            return false;
          });
        if (!result) throw new Error("验证答案ID所属时出现错误");
        return value;
      })
      .error(new Error("答案ID错误")),
  });
  return validator(schema)(ctx, next);
}
export default compose([authMiddleware(0), verifyId, verifyAnswerId]);
