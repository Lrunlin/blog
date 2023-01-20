import Joi from "joi";
import type { Context, Next } from "koa";
import { urlAllowNull } from "../../modules/url";
import { fileNameAllowNull } from "../../modules/file-name";
import validator from "@/common/middleware/verify/validator";
import compose from "koa-compose";
import tag from "@/common/verify/modules/tag";
import auth from "@/common/middleware/auth";

let verifyState = Joi.object({
  state: Joi.number().valid(0, 1).error(new Error("State错误")),
});

/** 验证文章*/
let article = Joi.object({
  title: Joi.string().min(3).max(200).required().error(new Error("标题为1-50的字符串")),
  description: Joi.string()
    .allow("")
    .max(200)
    .required()
    .allow(null)
    .error(new Error("文章介绍为1-200的字符串或者null")),
  cover_file_name: fileNameAllowNull,
  reprint: urlAllowNull,
  state: Joi.number().valid(1).error(new Error("state错误")),
  tag: tag,
  content: Joi.string().min(20).required().error(new Error("文章内容为最短20的HTML字符串")),
});

/** 验证草稿箱*/
let drafts = Joi.object({
  title: Joi.string().min(3).max(200).required().error(new Error("标题为1-50的字符串")),
  description: Joi.string()
    .allow("")
    .max(200)
    .required()
    .allow(null)
    .error(new Error("文章介绍为1-200的字符串或者null")),
  cover_file_name: Joi.string()
    .allow("")
    .required()
    .min(15)
    .max(50)
    .allow(null)
    .lowercase()
    .pattern(/^((?!http).)*$/)
    .pattern(/^((?!\/).)*$/)
    .error(new Error("封面地址为图片名称，禁止包含http、/等字眼")),
  reprint: Joi.string()
    .allow("")
    .required()
    .min(10)
    .max(150)
    .allow(null)
    .lowercase()
    .pattern(/^https:\/\/.*/)
    .error(new Error("转载地址为10-100的字符串，要求为https网址")),
  state: Joi.number().valid(0).error(new Error("state错误")),
  tag: tag,
  content: Joi.string().min(20).error(new Error("文章内容为最短20的HTML字符串")),
});

/** 创建文章验证参数的中间件*/
const verifyParamsMiddleware1 = async (ctx: Context, next: Next) =>
  validator(verifyState, false, true)(ctx, next);
const verifyParamsMiddleware2 = async (ctx: Context, next: Next) =>
  validator(ctx.request.body.state == 1 ? article : drafts)(ctx, next);

export default compose([auth(0), verifyParamsMiddleware1, verifyParamsMiddleware2]);
