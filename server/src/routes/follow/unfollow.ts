import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";
import sequelize from "@/db/config";
import transaction from "@/common/transaction/follow/unfollow";

let router = new Router();

router.delete("/follow/:belong_id", interger([], ["belong_id"]), auth(0), async ctx => {
  let belong_id = +ctx.params.belong_id;
  
  let t = await sequelize.transaction();
  let _t = await transaction(belong_id, ctx.id as number, t);

  let result = await DB.Follow.destroy({
    where: {
      belong_id: belong_id,
      user_id: ctx.id,
    },
  })
    .then(res => !!res)
    .catch(err => {
      console.log(err);
      return false;
    });

  if (result && _t) {
    ctx.body = { success: true, message: "操作成功" };
    t.commit();
  } else {
    ctx.status = 500;
    ctx.body = { success: false, message: "操作失败" };
    t.rollback();
  }
});
export default router;
