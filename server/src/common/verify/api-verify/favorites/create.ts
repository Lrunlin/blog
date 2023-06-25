import compose from "koa-compose";
import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import auth from "@/common/middleware/auth";

const schema = Joi.object({
  name: Joi.string().required().max(15).error(new Error("name错误")),
  description: Joi.string().max(100).allow(null).error(new Error("description错误")),
  is_private: Joi.boolean().required().error(new Error("is_private错误")),
});

export default compose([auth(0), validator(schema)]);
