import type { Context, Next } from "koa";
import verify from "../utils/jwt/verify";

/**
 * 获取用户ID以及身份
 *
 */
const getUserId = async (ctx: Context, next: Next) => {
  let token = ctx.headers.authorization;
  if (!token) {
    await next();
    return;
  }
  await verify(token as string)
    .then(async (decoded: any) => {
      ctx.id = decoded.id;
      ctx.auth = decoded.auth;
    })
    .catch(() => {})
    .finally(async () => {
      await next();
    });
};
export default getUserId;
