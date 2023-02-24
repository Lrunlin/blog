import Router from "@koa/router";
import verify from "@/common/verify/api-verify/problem/adopt";
import DB from "@/db";
import sequelize from "@/db/config";
import transaction from "@/common/transaction/problem/adopt";
let router = new Router();

/** 问题采纳答案*/
router.put("/problem/adopt/:id", verify, async ctx => {
  let t = await sequelize.transaction();
  let _t = await transaction(+ctx.params.id, t);
  let result = await DB.Problem.update(
    { answer_id: ctx.request.body.answer_id },
    { where: { id: ctx.params.id }, transaction: t }
  )
    .then(([res]) => !!res)
    .catch(err => {
      console.log(err);
      return false;
    });

  if (_t && result) {
    ctx.body = { success: true, message: "修改成功" };
    t.commit();
  } else {
    ctx.status = 500;
    t.rollback();
  }
});
export default router;
