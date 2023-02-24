import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/answer/create";
import sequelize from "@/db/config";
import transaction from "@/common/transaction/answer/create";

let router = new Router();
router.post("/answer", verify, async ctx => {
  const { content, problem_id } = ctx.request.body;
  let t = await sequelize.transaction();
  let _id = id();
  let result = await DB.Answer.create(
    {
      id: _id,
      content,
      problem_id,
      create_time: new Date(),
      author: ctx.id as number,
    },
    { transaction: t }
  )
    .then(() => true)
    .catch(err => {
      console.log(err);
      return false;
    });
  let _t = await transaction(_id, problem_id, t);

  let isSuccess = result && _t;
  if (isSuccess) {
    t.commit();
    ctx.body = { success: true, message: "回答成功" };
  } else {
    ctx.status = 500;
    t.rollback();
  }
});
export default router;
