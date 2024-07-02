import Joi from "joi";
import compose from "koa-compose";
import auth from "@/common/middleware/auth";
import validator from "@/common/middleware/verify/validatorAsync";

let schema = Joi.object({
  id: Joi.number().min(1).not(0).error(new Error("ID参数错误")),
});

export default compose([auth(), validator(schema)]);
