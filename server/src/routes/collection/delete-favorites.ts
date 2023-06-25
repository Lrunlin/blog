import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";
import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
import transaction from "@/common/transaction/favorites/delete";
import stringArrayReplace from "@/db/utils/stringArrayReplace";

let router = new Router();

// 删除收藏中的某个收藏集
router.delete(
  "/collection/favorites/:belong_id",
  auth(0),
  interger(["favorites_id"], ["belong_id"]),

  async ctx => {
    let favorites_id = ctx.query.favorites_id as string;
    let belong_id = ctx.params.belong_id as string;
    let t = await sequelize.transaction();
    // 将collocation中的favorites_id置换掉
    let favoritesIDReplace = await stringArrayReplace(
      {
        tableName: "Collection",
        field: "favorites_id",
        oldValue: favorites_id,
        newValue: "",
        whereSql: `and belong_id='${belong_id}' and user_id=${ctx.id}`,
      },
      { transaction: t }
    );
    let _t = await transaction(t);

    if (_t && favoritesIDReplace) {
      ctx.body = { success: true, message: "删除成功" };
      t.commit();
    } else {
      ctx.status = 500;
      ctx.body = { success: false, message: "删除失败" };
      t.rollback();
    }
  }
);
export default router;
