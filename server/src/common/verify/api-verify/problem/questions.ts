import Joi from "joi";
import compose from "koa-compose";
import getUserId from "@/common/middleware/auth/getUserId";
import validator from "@/common/middleware/verify/validator";

const schema = Joi.object({
  id: Joi.number().min(0).required().error(new Error("问题ID错误")),
});
export default compose([validator(schema, true), getUserId]);
