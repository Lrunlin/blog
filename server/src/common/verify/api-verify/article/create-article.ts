import Joi from "joi";
import type { Context, Next } from "koa";
import validator from "@/common/middleware/verify/validatorAsync";
import compose from "koa-compose";
import auth from "@/common/middleware/auth";
import option from "./common.module";

let verifyState = Joi.object({
  state: Joi.number().valid(0, 1).error(new Error("State错误")),
});

/** 验证文章*/

let article = Joi.object({
  state: Joi.number().valid(1).error(new Error("state错误")),
  ...option,
});

let drafts = Joi.object({
  ...option,
  state: Joi.number().valid(0).error(new Error("state错误")),
  content: Joi.string().required().error(new Error("请传递content参数")),
});

/** 创建文章验证参数的中间件*/
const verifyParamsMiddleware1 = async (ctx: Context, next: Next) =>
  validator(verifyState, false, true)(ctx, next);
const verifyParamsMiddleware2 = async (ctx: Context, next: Next) =>
  validator(ctx.request.body.state == 1 ? article : drafts)(ctx, next);

export default compose([auth(0), verifyParamsMiddleware1, verifyParamsMiddleware2]);
