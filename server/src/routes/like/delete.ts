import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";

let router = new Router();
router.delete("/like/:belong_id", interger([], ["belong_id"]), auth(0), async ctx => {
  let belong_id = +ctx.params.belong_id;

  await DB.Likes.destroy({
    where: {
      belong_id: belong_id,
      user_id: ctx.id,
    },
  })
    .then(res => {
      let isSuccess = !!res;
      ctx.body = { success: isSuccess, message: isSuccess ? "取消成功" : "取消失败" };
    })
    .catch(err => {
      console.log(err);
      ctx.status = 500;
    });
});
export default router;
