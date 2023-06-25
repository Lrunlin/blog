import Router from "@koa/router";
import DB from "@/db";
import interger from "@/common/verify/integer";
import auth from "@/common/middleware/auth";
import sequelize from "@/db/config";
import transaction from "@/common/transaction/favorites/delete";
import stringArrayReplace from "@/db/utils/stringArrayReplace";

let router = new Router();

// 直接删除收藏夹
router.delete("/favorites/:id", interger([], ["id"]), auth(0), async ctx => {
  let id = +ctx.params.id;
  let t = await sequelize.transaction();
  // 将collocation中的favorites_id置换掉
  let favoritesIDReplace = await stringArrayReplace(
    { tableName: "Collection", field: "favorites_id", oldValue: id, newValue: "" },
    { transaction: t }
  );
  let _t = await transaction(t);

  let result = await DB.Favorites.destroy({
    where: {
      id: +ctx.params.id,
      user_id: ctx.id,
    },
    transaction: t,
  })
    .then(rows => !!rows)
    .catch(err => {
      console.log(err);
      return false;
    });

  if (result && _t && favoritesIDReplace) {
    ctx.body = { success: true, message: "删除成功" };
    t.commit();
  } else {
    ctx.status = 500;
    ctx.body = { success: false, message: "删除失败" };
    t.rollback();
  }
});
export default router;
