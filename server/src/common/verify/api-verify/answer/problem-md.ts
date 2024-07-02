import Joi from "joi";
import compose from "koa-compose";
import auth from "@/common/middleware/auth";
import validator from "@/common/middleware/verify/validatorAsync";

let schema = Joi.object({
  problem_id: Joi.number()
    .min(0)
    .required()
    .error(new Error("问题ID格式不正确")),
});

export default compose([auth(0), validator(schema)]);
