import compose from "koa-compose";
import Joi from "joi";
import validator from "@/common/middleware/verify/validatorAsync";
import authMiddleware from "@/common/middleware/auth";
import { Next, Context } from "koa";

/** 验证是否存在该采纳*/
async function verifyParams(ctx: Context, next: Next) {
  const schema = Joi.object({
    id: Joi.number().min(0).required().error(new Error("问题ID错误")),
  });
  return validator(schema, true)(ctx, next);
}
export default compose([authMiddleware(0), verifyParams]);
