import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";

let router = new Router();
router.delete("/collection/:article_id", interger([], ["article_id"]), auth(0), async ctx => {
  let article_id = +ctx.params.article_id;

  await DB.Collection.destroy({
    where: {
      article_id: article_id,
      user_id: ctx.id,
    },
  })
    .then(res => {
      let isSuccess = !!res;
      ctx.body = { success: isSuccess, message: isSuccess ? "删除成功" : "删除失败" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "删除失败" };
      console.log(err);
    });
});
export default router;
