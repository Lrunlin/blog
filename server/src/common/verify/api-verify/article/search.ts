import Joi from "joi";
import type { Context, Next } from "koa";
import verify from "@/common/middleware/verify/validator";
import interger from "../../integer";
import compose from "koa-compose";
const schema = Joi.object({
  author: Joi.number().min(1).error(new Error("ID格式错误")),
  state: Joi.number().valid(0, 1).error(new Error("文章状态错误")),
  keyword: Joi.string().min(0).max(30).error(new Error("文章关键词错误")),
  tag: Joi.string().min(1).max(30).error(new Error("文章标签错误")),
});

const verify1 = async (ctx: Context, next: Next) => interger([], ["page"])(ctx, next);
const verify2 = async (ctx: Context, next: Next) => verify(schema)(ctx, next);

export default compose([verify1, verify2]);
