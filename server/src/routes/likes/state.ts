import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";

let router = new Router();
router.get("/likes/state/:article_id", auth(0), interger([], ["article_id"]), async ctx => {
  await DB.Likes.findOne({
    where: {
      user_id: ctx.id,
      article_id: ctx.params.article_id,
    },
  })
    .then(res => {
      if (res) {
        ctx.body = { success: true, message: "点赞了" };
      } else {
        ctx.body = { success: false, message: "没点赞" };
      }
    })
    .catch(err => {
      ctx.body = { success: false, message: "没点赞" };
      console.log(err);
    });
});
export default router;
