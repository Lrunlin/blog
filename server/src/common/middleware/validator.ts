import type { ObjectSchema } from "Joi";
import type { Context, Next } from "koa";

/** 对query和body的参数进行验证*/
export default function validator(schema: ObjectSchema<any>, isParams?: true) {
  return async (ctx: Context, next: Next) => {
    let validate = schema.validate(
      isParams
        ? ctx.params
        : "DELETE,GET".includes(ctx.method)
        ? ctx.request.query
        : ctx.request.body
    );
    if (validate.error) {
      ctx.status = 400;
      ctx.body = { success: false, message: validate.error?.message || "请求参数错误" };
    } else {
      await next();
    }
  };
}
