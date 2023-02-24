import Router from "@koa/router";
import DB from "@/db";
import verify from "@/common/verify/api-verify/answer/delete";
import sequelize from "@/db/config";
import transaction from "@/common/transaction/answer/delete";

let router = new Router();
router.delete("/answer/:id", verify, async ctx => {
  let t = await sequelize.transaction();
  //删除答案
  let result = await DB.Answer.destroy({
    where: {
      id: ctx.params.id,
      author: ctx.id,
    },
    transaction: t,
  })
    .then(row => row)
    .catch(err => {
      ctx.status = 500;
      console.log(err);
      return false;
    });
  let _t = await transaction(ctx.params.id, t);

  let isSuccess = _t && result;
  if (isSuccess) {
    ctx.body = { success: true, message: "删除成功" };
    t.commit();
  } else {
    ctx.body = { success: false, message: "删除失败" };
    ctx.status = 500;
    t.rollback();
  }
});
export default router;
