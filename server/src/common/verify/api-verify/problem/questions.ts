import compose from "koa-compose";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import getUserId from "@/common/middleware/getUserId";

const schema = Joi.object({
  id: Joi.number().min(0).required().error(new Error("问题ID错误")),
});
export default compose([validator(schema, true), getUserId]);
