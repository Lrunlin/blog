import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";
let router = new Router();

// 直接删除整条收藏信息
router.delete("/collection/:belong_id", interger([], ["belong_id"]), auth(0), async ctx => {
  let belong_id = +ctx.params.belong_id;

  await DB.Collection.destroy({
    where: {
      belong_id: belong_id,
      user_id: ctx.id,
    },
  })
    .then(res => {
      let isSuccess = !!res;
      ctx.body = { success: isSuccess, message: isSuccess ? "删除成功" : "删除失败" };
    })
    .catch(err => {
      ctx.status = 500;
      console.log(err);
    });
});
export default router;
