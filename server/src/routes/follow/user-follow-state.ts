import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";

let router = new Router();

/** 判断用户是否关注了某个博主*/
router.get("/follow/state/:id", auth([0,1]), async ctx => {
  await DB.Follow.findAndCountAll({
    where: {
      blogger_id: ctx.params.id,
      user_id: ctx.id,
    },
  })
    .then(({ count }) => {
      let isSuccess = !!count;
      ctx.body = { success: isSuccess, message: isSuccess ? "已关注" : "未关注" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "未关注" };
      console.log(err);
    });
});
export default router;
