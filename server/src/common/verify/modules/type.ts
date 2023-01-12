import Joi from "joi";
/** 设置评论、*/
const type = Joi.valid("article", "questions").required();
export default type;
