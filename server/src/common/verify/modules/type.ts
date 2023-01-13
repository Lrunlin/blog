import Joi from "joi";
/** 设置评论、*/
const type = Joi.valid("article", "questions").required().error(new Error("类型错误"));
export default type;
