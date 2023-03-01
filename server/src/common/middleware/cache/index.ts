import type { Context, Next } from "koa";
import Redis from "@/common/utils/redis";
let client = Redis();

/**
 * 传递数字或者数组进行权限判断，如果通过设置id和status
 * @params auth {number[] | number} 身份代码
 */
async function cache(
  key: (ctx: Context) => string,
  allowSaveValue: (ctx: Context) => any,
  seconds?: number
) {
  return async (ctx: Context, next: Next) => {
    let _key = key(ctx);
    let data = await client.get("cache-" + _key);
    if (data) {
      ctx.body = JSON.parse(data);
    } else {
      await next();
      let _allowSaveValue = allowSaveValue(ctx);
      if (_allowSaveValue) {
        client.set(_key, JSON.stringify(ctx.body), "EX", seconds || 300);
      }
    }
  };
}
export default cache;
