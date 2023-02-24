import Joi from "joi";
/** 类型:文章、问题*/
export const typeCollection = Joi.valid("article", "problem")
  .required()
  .error(new Error("类型错误"));
/** 类型:文章、问题、答案*/
export const typeLikeComment = Joi.valid("article", "problem", "answer")
  .required()
  .error(new Error("类型错误"));
/** 用于对用户和问题进行关注*/
export const typeFollwoProblem = Joi.valid("user", "problem")
  .required()
  .error(new Error("类型错误"));
