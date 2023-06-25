import type { Context, Next } from "koa";
import verify from "@/common/utils/jwt/verify";

type authCode = 1 | 0;

/**
 * 传递数字或者数组进行权限判断，如果通过设置id和status
 * @params auth {number[] | number} 身份代码
 */
function auth(auth?: authCode[] | authCode) {
  return async (ctx: Context, next: Next) => {
    let token = ctx.headers.authorization;
    if (!token) {
      ctx.status = 401;
      return;
    }
    // ?管理员可以访问全部接口
    let authList = typeof auth == "number" ? [1, auth] : [1, ...(auth || [])];

    await verify(token as string)
      .then(async (decoded: any) => {
        if (authList.includes(decoded.auth)) {
          ctx.id = decoded.id;
          ctx.auth = decoded.auth;
          await next();
        } else {
          ctx.status = 401;
        }
      })
      .catch(err => {
        ctx.status = 401;
      });
  };
}
export default auth;
