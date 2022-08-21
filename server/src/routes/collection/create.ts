import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import useID from "@/common/hooks/useId";

let router = new Router();
router.post("/collection/:article_id", auth([0, 1]), async ctx => {
  let id = useID();
  let article_id = +ctx.params.article_id;

  await DB.Collection.create({
    id: id,
    article_id: article_id,
    user_id: ctx.id as number,
    time: new Date(),
  })
    .then(res => {
      ctx.body = { success: true, message: "收藏成功" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "收藏失败" };
      console.log(err);
    });
});
export default router;
