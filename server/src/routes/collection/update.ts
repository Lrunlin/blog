import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/collection/update";

let router = new Router();
router.put("/collection/:belong_id", verify, async (ctx) => {
  let belong_id = +ctx.params.belong_id;
  let favorites: any[] = ctx.request.body.favorites_id;

  let t = await sequelize.transaction();

  let deleteResult = await DB.Collection.destroy({
    where: { favorites_id: favorites },
    transaction: t,
  })
    .then((rows) => !!rows)
    .catch(() => false);

  let result = await DB.Collection.bulkCreate(
    favorites.map(
      (item) => ({
        id: id(),
        belong_id: belong_id,
        type: ctx.request.body.type as string,
        user_id: ctx.id as number,
        create_time: new Date(),
        favorites_id: item,
      }),
      { transaction: t },
    ),
  )
    .then(() => true)
    .catch((err) => false);

  if (deleteResult && result) {
    ctx.body = { success: true, message: "修改成功" };
    t.commit();
  } else {
    ctx.status = 500;
    ctx.body = { success: false, message: "修改失败" };
    t.rollback();
  }
});
export default router;
