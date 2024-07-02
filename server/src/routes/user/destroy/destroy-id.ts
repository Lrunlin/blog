import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import destroy from "@/common/modules/user/destroy";

let router = new Router();
router.post("/user/destroy/:id", auth(1), async (ctx) => {
  if (process.env.AUTH_MODE != "session") {
    ctx.body = {
      success: false,
      message: "当前鉴权模式不为Session，不支持注销",
    };
    ctx.status = 500;
    return;
  }

  let user_id = ctx.params.id;

  let userData = await DB.User.findByPk(user_id, { attributes: ["auth"] });
  if (userData?.auth == 1) {
    ctx.body = { success: false, message: "管理员不能注销账号" };
    ctx.status = 500;
    return;
  }

  await destroy(+user_id!)
    .then((params) => {
      ctx.body = params;
      if (!params.success) {
        ctx.status = 500;
      }
    })
    .catch((err) => {
      ctx.body = { success: false, message: "注销失败" };
      ctx.status = 500;
      console.log(err);
    });
});
export default router;
