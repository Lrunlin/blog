import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";

let router = new Router();
router.get("/collection/state/:belong_id", auth(0), interger([], ["belong_id"]), async ctx => {
  await DB.Collection.findOne({
    where: {
      user_id: ctx.id,
      belong_id: ctx.params.belong_id,
    },
  })
    .then(res => {
      if (res) {
        ctx.body = { success: true, message: "收藏了" };
      } else {
        ctx.body = { success: false, message: "没收藏" };
      }
    })
    .catch(err => {
      ctx.body = { success: false, message: "没收藏" };
      console.log(err);
    });
});
export default router;
