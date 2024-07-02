import Router from "@koa/router";
import auth from "@/common/middleware/auth";
import destroy from "@/common/modules/user/destroy";

let router = new Router();
router.post("/user/destroy", auth(0), async (ctx) => {
  if (process.env.AUTH_MODE != "session") {
    ctx.body = {
      success: false,
      message: "当前鉴权模式不为Session，不支持注销",
    };
    ctx.status = 500;
    return;
  }

  if (ctx.auth != 0) {
    ctx.body = { success: false, message: "只有普通用户才能注销账号" };
    ctx.status = 500;
  }

  await destroy(ctx.id!)
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
