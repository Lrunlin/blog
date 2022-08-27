import Joi from "Joi";
import { cache } from "@/common/modules/cache/type";
import { TagAttributes } from "@/db/models/init-models";
import type { Context, Next } from "koa";
import validator from "@/common/middleware/validator";

let verifyState = Joi.object({
  state: Joi.number().valid(0, 1).error(new Error("State错误")),
});

/** 验证文章*/
let article = Joi.object({
  title: Joi.string().min(1).max(50).required().error(new Error("标题为1-50的字符串")),
  description: Joi.string()
    .allow("")
    .max(200)
    .required()
    .allow(null)
    .error(new Error("文章介绍为1-200的字符串或者null")),
  cover_file_name: Joi.string()
    .allow("")
    .min(15)
    .max(50)
    .required()
    .allow(null)
    .lowercase()
    .pattern(/^((?!http).)*$/)
    .pattern(/^((?!\/).)*$/)
    .error(new Error("封面地址为图片名称，禁止包含http、/等字眼")),
  reprint: Joi.string()
    .allow("")
    .min(10)
    .max(150)
    .required()
    .allow(null)
    .lowercase()
    .pattern(/^https:\/\/.*/)
    .error(new Error("转载地址为10-100的字符串，要求为https网址")),
  state: Joi.number().valid(1).error(new Error("state错误")),
  tag: Joi.array()
    .items(Joi.number().required())
    .min(1)
    .max(6)
    .required()
    .error(new Error("网站标签为1-5个"))
    .custom((value: number[], helper) => {
      let tags = cache.get("tag") as Array<TagAttributes>;
      if (value.every(item => tags.some(_item => _item.id == item))) {
        return true;
      } else {
        return helper.message(new Error("tag_id不在数据表内") as any);
      }
    }),
  content: Joi.string().min(20).required().error(new Error("文章内容为最短20的HTML字符串")),
});

/** 验证草稿箱*/
let drafts = Joi.object({
  title: Joi.string().min(1).max(50).required().error(new Error("标题为1-50的字符串")),
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
  tag: Joi.array()
    .items(Joi.number())
    .max(6)
    .required()
    .error(new Error("网站标签填写错误"))
    .custom((value: number[], helper) => {
      let tags = cache.get("tag") as Array<TagAttributes>;
      if (value.every(item => tags.some(_item => _item.id == item))) {
        return true;
      } else {
        return helper.message(new Error("tag_id不在数据表内") as any);
      }
    }),
  content: Joi.string().min(20).error(new Error("文章内容为最短20的HTML字符串")),
});

/** 创建文章验证参数的中间件*/
export const verifyStateMiddleware = validator(verifyState, false, true);
export const verifyParamsMiddleware = async (ctx: Context, next: Next) => {
  return await validator(ctx.request.body.state == 1 ? article : drafts)(ctx, next);
};
