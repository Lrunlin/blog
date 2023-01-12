import compose from "koa-compose";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import interger from "@/common/verify/integer";
import auth from "@/common/middleware/auth";
import typeSchema from "@/common/verify/modules/type";
const schema = Joi.object({
  type: typeSchema,
});
export default compose([interger([], ["belong_id"]), auth(0), validator(schema)]);
