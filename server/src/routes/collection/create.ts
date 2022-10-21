import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import id from "@/common/utils/id";
import interger from "@/common/verify/integer";
let router = new Router();
router.post("/collection/:article_id", interger([], ["article_id"]), auth(0), async ctx => {
  let article_id = +ctx.params.article_id;

  let articleAuthor = await DB.Article.findByPk(article_id, { attributes: ["author"] });
  if (!articleAuthor) {
    ctx.body = { success: false, message: "没有找到对应的文章" };
    return;
  }

  if (articleAuthor.author == ctx.id) {
    ctx.body = { success: false, message: "自己的文章就别收藏了吧" };
    return;
  }

  let collectionHistory = await DB.Collection.findOne({
    where: { article_id: article_id, user_id: ctx.id },
  });
  if (collectionHistory) {
    ctx.body = { success: false, message: "禁止重复收藏" };
    return;
  }

  await DB.Collection.create({
    id: id(),
    article_id: article_id,
    user_id: ctx.id as number,
    create_time: new Date(),
  })
    .then(() => {
      ctx.body = { success: true, message: "收藏成功" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "收藏失败" };
      console.log(err);
    });
});
export default router;
