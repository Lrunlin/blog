import Router from "@koa/router";
import DB from "@/db";
import verify from "@/common/verify/api-verify/favorites/create";
let router = new Router();

router.put("/favorites/:id", verify, async ctx => {
  await DB.Favorites.update(
    {
      user_id: ctx.id as number,
      name: ctx.request.body.name,
      description: ctx.request.body.description,
      is_private: ctx.request.body.is_private,
    },
    {
      where: { id: ctx.params.id, user_id: ctx.id },
    }
  )
    .then(row => {
      ctx.body = { success: true, message: "修改成功" };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "修改失败" };
    });
});
export default router;
