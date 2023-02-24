import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import compose from "koa-compose";
import auth from "@/common/middleware/auth";
let verifyId = Joi.object({
  id: Joi.number().min(0).required().error(new Error("答案ID格式错误")),
});
let verifyContent = Joi.object({
  content: Joi.string().min(1).required().error(new Error("文章内容为最短20的HTML字符串")),
});
export default compose([auth(0), validator(verifyId, true), validator(verifyContent)]);
