import Joi from "joi";

/** 上传图片验证配置(允许null)*/
const fileNameAllowNull = Joi.string()
  .allow("")
  .min(4)
  .max(50)
  .required()
  .allow(null)
  .lowercase()
  .pattern(/^((?!http).)*$/)
  .pattern(/^((?!\/).)*$/)
  .error(new Error("封面地址为图片名称，禁止包含http、/等字眼"));

/** 上传图片验证配置*/
const fileName = Joi.string()
  .min(4)
  .max(50)
  .required()
  .lowercase()
  .pattern(/^((?!http).)*$/)
  .pattern(/^((?!\/).)*$/)
  .error(new Error("封面地址为图片名称，禁止包含http、/等字眼"));

export { fileNameAllowNull, fileName };
