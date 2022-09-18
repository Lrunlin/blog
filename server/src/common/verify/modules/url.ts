import Joi from "joi";
const url = Joi.string()
  .max(100)
  .required()
  .lowercase()
  .pattern(/^https:\/\/.*/)
  .error(new Error("URL为1-100的字符串，要求为https网址"));
const urlAllowNull = Joi.string()
  .allow("")
  .allow(null)
  .min(8)
  .max(100)
  .required()
  .lowercase()
  .pattern(/^https:\/\/.*/)
  .error(new Error("URL为8-100的字符串，要求为https网址"));
export  { url, urlAllowNull };
