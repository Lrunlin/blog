import type { ObjectSchema } from "joi";
import type { Context, Next } from "koa";

/** 对query和body的参数进行验证（支持异步）*/
export default function validator(
  schema: ObjectSchema<any>,
  isParams?: boolean,
  allowUnknown?: boolean
) {
  return async (ctx: Context, next: Next) => {
    await schema
      .validateAsync(
        isParams
          ? ctx.params
          : "DELETE,GET".includes(ctx.method)
          ? ctx.request.query
          : ctx.request.body,
        { allowUnknown: allowUnknown }
      )
      .then(async res => {
        await next();
      })
      .catch(err => {
        ctx.status = 400;
        ctx.body = { success: false, message: err + "" || "请求参数错误" };
      });
  };
}
