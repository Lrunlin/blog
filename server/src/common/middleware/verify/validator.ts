import type { ObjectSchema } from "joi";
import type { Context, Next } from "koa";

/** 对query和body的参数进行验证*/
export default function validator(
  /** Joi配置*/
  schema: ObjectSchema<any>,
  /** 是否ctx.params参数*/
  isParams?: boolean,
  /** 是否允许其他参数*/
  allowUnknown?: boolean
) {
  return async (ctx: Context, next: Next) => {
    let validate = schema.validate(
      isParams
        ? ctx.params
        : "DELETE,GET".includes(ctx.method)
        ? ctx.request.query
        : ctx.request.body,
      { allowUnknown: !!allowUnknown }
    );
    if (validate.error) {
      ctx.status = 400;
      ctx.body = { success: false, message: validate.error?.message || "请求参数错误" };
    } else {
      await next();
    }
  };
}
