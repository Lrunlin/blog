import type { Context, Next } from "koa";
import Joi from "joi";
const schema = Joi.array().items(Joi.number().min(0)).required();
/** 验证整数，第一个数组是query的key第二个是params的key*/
const interger =
  (query: string[] = [], params: string[] = []) =>
  async (ctx: Context, next: Next) => {
    let validate = schema.validate(
      query.map(item => ctx.query[item]).concat(params.map(item => ctx.params[item]))
    );
    if (validate.error) {
      ctx.status = 400;
      ctx.body = { success: false, message: `请求参数错误(整数)` };
    } else {
      await next();
    }
  };
export default interger;
