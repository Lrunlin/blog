import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/favorites/create";
let router = new Router();

router.post("/favorites", verify, async ctx => {
  await DB.Favorites.create({
    id: id(),
    user_id: ctx.id as number,
    name: ctx.request.body.name,
    description: ctx.request.body.description,
    is_private: ctx.request.body.is_private,
    create_time: new Date(),
  })
    .then(row => {
      ctx.body = { success: true, message: "创建成功" };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "创建失败" };
    });
});
export default router;
