import Joi from "joi";
import compose from "koa-compose";
import auth from "@/common/middleware/auth";
import validator from "@/common/middleware/verify/validatorAsync";

const schema = Joi.object({
  name: Joi.string().required().max(15).error(new Error("name错误")),
  description: Joi.string()
    .max(100)
    .allow(null)
    .error(new Error("description错误")),
  is_private: Joi.boolean().required().error(new Error("is_private错误")),
});

export default compose([auth(0), validator(schema)]);
