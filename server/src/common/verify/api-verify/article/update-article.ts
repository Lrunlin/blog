import compose from "koa-compose";
import Joi from "joi";
import type { Context, Next } from "koa";
import validator from "@/common/middleware/verify/validator";
import { urlAllowNull } from "../../modules/url";
import { fileNameAllowNull } from "../../modules/file-name";
import interger from "@/common/verify/integer";
import tag from "@/common/verify/modules/tag";

let verifyState = Joi.object({
  state: Joi.number().valid(0, 1).error(new Error("State错误")),
});

const article = Joi.object({
  title: Joi.string().min(3).max(200).required().error(new Error("标题为1-50的字符串")),
  description: Joi.string()
    .allow("")
    .max(200)
    .required()
    .allow(null)
    .error(new Error("文章介绍为1-200的字符串或者null")),
  cover_file_name: fileNameAllowNull,
  view_count: Joi.number().min(0).error(new Error("文章阅读量大于0的数字")),
  reprint: urlAllowNull,
  state: Joi.number().valid(1).error(new Error("state错误")),
  tag: tag,
  content: Joi.string().min(20).required().error(new Error("文章内容为最短20的HTML字符串")),
});

const drafts = Joi.object({
  title: Joi.string().min(3).max(200).required().error(new Error("标题为1-50的字符串")),
  description: Joi.string()
    .allow("")
    .max(200)
    .required()
    .allow(null)
    .error(new Error("文章介绍为1-200的字符串或者null")),
  cover_file_name: fileNameAllowNull,
  view_count: Joi.number().min(0).error(new Error("文章阅读量大于0的数字")),
  reprint: urlAllowNull,
  state: Joi.number().valid(0).error(new Error("state错误")),
  tag: tag,
  content: Joi.string().min(20).required().error(new Error("文章内容为最短20的HTML字符串")),
});

async function validatorMiddleware1(ctx: Context, next: Next) {
  return validator(verifyState, false, true)(ctx, next);
}
async function validatorMiddleware2(ctx: Context, next: Next) {
  return interger([], ["id"])(ctx, next);
}
async function validatorMiddleware3(ctx: Context, next: Next) {
  return validator(ctx.request.body.state == 1 ? article : drafts)(ctx, next);
}

export default compose([validatorMiddleware1, validatorMiddleware2, validatorMiddleware3]);
