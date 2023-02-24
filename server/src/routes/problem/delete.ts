import Router from "@koa/router";
let router = new Router();
import integer from "@/common/verify/integer";
import DB from "@/db";
import sequelize from "@/db/config";
import transaction from "@/common/transaction/problem/delete";

router.delete("/problem/:id", integer([], ["id"]), async ctx => {
  const id = ctx.params.id;
  let t = await sequelize.transaction();
  let result = await DB.Problem.destroy({
    where: {
      id,
    },
    transaction: t,
  })
    .then(res => !!res)
    .catch(err => {
      console.log(err);
      return false;
    });
  let _t = await transaction(+id, t);
  if (result && _t) {
    ctx.body = { success: true, message: "发布成功" };
    t.commit();
  } else {
    ctx.body = { success: false, message: "发布失败" };
    t.rollback();
  }
});
export default router;
