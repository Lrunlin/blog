import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";

let router = new Router();
router.post("/user/recovery/:id", auth(1), async (ctx) => {
  let user_id = ctx.params.id;

  await DB.User.update(
    {
      email: `${user_id}@blog.com`,
      password: user_id.substring(0, 10),
      state: 1,
    },
    {
      where: { id: user_id, state: 0 },
    },
  )
    .then(([row]) => {
      if (row) {
        ctx.body = {
          success: true,
          message: "恢复成功",
          data: {
            email: `${user_id}@blog.com`,
            password: user_id.substring(0, 10),
          },
        };
      } else {
        ctx.body = { success: false, message: "恢复失败" };
        ctx.status = 500;
      }
    })
    .catch((err) => {
      ctx.body = { success: false, message: "恢复失败" };
      ctx.status = 500;
      console.log(err);
    });
});
export default router;
