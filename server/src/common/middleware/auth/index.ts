import type { Context, Next } from "koa";
import verify from "./verify";

type authCode = 1 | 0;

/**
 * 传递数字或者数组进行权限判断，如果通过设置id和status
 * @params auth {number[] | number} 身份代码
 */
function authMiddleware(auth: authCode[] | authCode) {
  return async (ctx: Context, next: Next) => {
    let token = ctx.headers.authorization;
    if (!token) {
      ctx.status = 401;
      return;
    }
    await verify(token as string)
      .then(async (decoded: any) => {
        //如果写的是一个数字
        if (typeof auth == "number") {
          if (decoded.auth == auth) {
            ctx.id = decoded.id;
            ctx.auth = decoded.auth;
            await next();
          } else {
            ctx.status = 401;
          }
        }
        //如果传的数组
        else {
          if (auth.includes(decoded.auth)) {
            ctx.id = decoded.id;
            ctx.auth = decoded.auth;
            await next();
          } else {
            ctx.status = 401;
          }
        }
      })
      .catch(err => {
        ctx.status = 401;
      });
  };
}
export default authMiddleware;
