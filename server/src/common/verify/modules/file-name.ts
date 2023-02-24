import Joi from "joi";

/** 上传图片验证配置*/
const fileName = Joi.string()
  .min(10)
  .max(50)
  .required()
  .lowercase()
  .pattern(/^((?!http).)*$/)
  .pattern(/^((?!,).)*$/)
  .pattern(/^((?!\/).)*$/)
  .error(new Error("图片名称错误"));

/** 上传图片验证配置(允许null)*/
const fileNameAllowNull = fileName.allow("").allow(null).lowercase();

export { fileNameAllowNull, fileName };
