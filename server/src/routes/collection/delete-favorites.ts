import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";

let router = new Router();

// 删除收藏中的某个收藏集
router.delete(
  "/collection/favorites/:belong_id",
  auth(0),
  interger(["favorites_id"], ["belong_id"]),
  async (ctx) => {
    let favorites_id = ctx.query.favorites_id as string;
    let belong_id = ctx.params.belong_id as string;
    let t = await sequelize.transaction();

    await DB.Collection.destroy({
      where: { favorites_id: favorites_id, belong_id: belong_id },
    })
      .then((res) => {
        ctx.body = { success: true, message: "删除成功" };
      })
      .catch((err) => {
        ctx.status = 500;
        ctx.body = { success: false, message: "删除失败" };
      });
  },
);
export default router;
