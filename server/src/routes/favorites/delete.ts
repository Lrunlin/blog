import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
import stringArrayReplace from "@/db/utils/stringArrayReplace";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";

let router = new Router();

// 直接删除收藏夹
router.delete("/favorites/:id", interger([], ["id"]), auth(0), async (ctx) => {
  let id = +ctx.params.id;
  let t = await sequelize.transaction();
  // 将collocation中的favorites_id置换掉
  let collectionResult = await DB.Collection.destroy({
    where: { favorites_id: id },
    transaction: t,
  })
    .then((rows) => !!rows)
    .catch(() => false);

  let result = await DB.Favorites.destroy({
    where: {
      id: +ctx.params.id,
      user_id: ctx.id,
    },
    transaction: t,
  })
    .then((rows) => !!rows)
    .catch((err) => {
      console.log(err);
      return false;
    });

  if (result && collectionResult) {
    ctx.body = { success: true, message: "删除成功" };
    t.commit();
  } else {
    ctx.status = 500;
    ctx.body = { success: false, message: "删除失败" };
    t.rollback();
  }
});
export default router;
