import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
let router = new Router();

router.delete("/follow/:bogger_id", auth([0, 1]), async ctx => {
  let boggerID = +ctx.params.bogger_id;

  await DB.Follow.destroy({
    where: {
      blogger_id: boggerID,
      user_id: ctx.id,
    },
  })
    .then(res => {
      let isSuccess = !!res;
      ctx.body = { success: isSuccess, message: isSuccess ? "删除成功" : "删除失败" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "关注失败" };
      console.log(err);
    });
});
export default router;
