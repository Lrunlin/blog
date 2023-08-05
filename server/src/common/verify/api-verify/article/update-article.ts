import compose from "koa-compose";
import Joi from "joi";
import type { Context, Next } from "koa";
import validator from "@/common/middleware/verify/validatorAsync";
import interger from "@/common/verify/integer";
import auth from "@/common/middleware/auth";
import option from "./common.module";

let verifyState = Joi.object({
  state: Joi.number().valid(0, 1).error(new Error("State错误")),
});

const article = Joi.object({
  ...option,
  view_count: Joi.number().min(0).error(new Error("文章阅读量大于0的数字")),
  state: Joi.number().valid(1).error(new Error("state错误")),
});

let drafts = Joi.object({
  ...option,
  view_count: Joi.number().min(0).error(new Error("文章阅读量大于0的数字")),
  state: Joi.number().valid(0).error(new Error("state错误")),
  content: Joi.string().required().error(new Error("请传递content参数")),
});

async function validatorMiddleware(ctx: Context, next: Next) {
  return validator(ctx.request.body.state == 1 ? article : drafts)(ctx, next);
}

export default compose([
  auth(0),
  validator(verifyState, false, true),
  interger([], ["id"]),
  validatorMiddleware,
]);
