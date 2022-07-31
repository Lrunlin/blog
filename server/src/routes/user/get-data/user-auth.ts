import Router from "@koa/router";
import jwt from "jsonwebtoken";

let router = new Router();
router.get("/user/auth", async ctx => {
  let token = ctx.header.authorization;
  if (!token) {
    ctx.body = { success: false, message: "没Token" };
    return;
  }
  try {
    let { id, auth } = jwt.verify(token, process.env.KEY as string) as any;
    ctx.body = { success: true, message: "解析成功", data: { id, auth } };
  } catch {
    ctx.body = { success: false, message: "Token解析失败" };
  }
});
export default router;
