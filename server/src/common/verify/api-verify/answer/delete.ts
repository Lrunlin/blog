import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import compose from "koa-compose";
import auth from "@/common/middleware/auth";
let schema = Joi.object({
  id: Joi.number().min(0).required().error(new Error("答案ID格式不正确")),
});

export default compose([auth(0), validator(schema, true)]);
