import Joi from "joi";

const url = Joi.string()
  .min(8)
  .max(100)
  .required()
  .lowercase()
  .pattern(/^https:\/\/.*/)
  .error(new Error("URL为1-100的字符串，要求为https网址"));

/** 链接验证(允许null)*/
const urlAllowNull = url.allow("").allow(null);
export { url, urlAllowNull };
