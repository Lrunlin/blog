import Router from "@koa/router";
import DB from "@/db";
import verify from "@/common/utils/auth/verify";

let router = new Router();
interface payLoadType {
  id: number;
}
router.get("/user/info", async (ctx) => {
  let token = ctx.header.authorization;
  if (!token) {
    ctx.body = { success: false, messgae: "没有检测到Token" };
    return;
  }

  try {
    let { id } = await verify(token);
    await DB.User.findByPk(id, {
      attributes: [
        "id",
        "name",
        "auth",
        "avatar_file_name",
        "avatar_url",
        "create_time",
      ],
    })
      .then((row) => {
        if (!row) {
          ctx.body = { success: false, messgae: "没有查询到用户信息" };
          return;
        }
        ctx.body = { success: true, messgae: "查询成功", data: row.toJSON() };
      })
      .catch((err) => {
        ctx.body = { success: false, messgae: "查询错误" };
      });
  } catch {
    ctx.body = { success: false, messgae: "Token解析失败" };
  }
});
export default router;
