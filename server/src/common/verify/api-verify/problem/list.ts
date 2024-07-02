import Joi from "joi";
import compose from "koa-compose";
import validator from "@/common/middleware/verify/validator";
import interger from "../../integer";

const schema = Joi.object({
  type: Joi.string()
    .valid("newest", "noanswer")
    .required()
    .error(new Error("Type参数错误")),
});
export default compose([validator(schema), interger([], ["page"])]);
