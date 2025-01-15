import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/collection/create";

let router = new Router();
router.post("/collection/:belong_id", verify, async (ctx) => {
  let belong_id = +ctx.params.belong_id;
  let favorites: any[] = ctx.request.body.favorites_id;

  await DB.Collection.bulkCreate(
    favorites.map((item) => ({
      id: id(),
      belong_id: belong_id,
      type: ctx.request.body.type as string,
      user_id: ctx.id as number,
      create_time: new Date(),
      favorites_id: item,
    })),
  )
    .then(() => {
      ctx.body = { success: true, message: "收藏成功" };
    })
    .catch((err) => {
      ctx.status = 500;
      console.log(err);
    });
});
export default router;
