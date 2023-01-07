import auth from "@/common/middleware/auth";
import Router from "@koa/router";
import interger from "@/common/verify/integer";
import DB from "@/db";
import id from "@/common/utils/id";
let router = new Router();

router.post("/likes/:article_id", interger([], ["article_id"]), auth(0), async ctx => {
  let article_id = +ctx.params.article_id;

  let articleAuthor = await DB.Article.findByPk(article_id, { attributes: ["author"] });
  if (!articleAuthor) {
    ctx.body = { success: false, message: "没有找到对应的文章" };
    return;
  }

  if (articleAuthor.author == ctx.id) {
    ctx.body = { success: false, message: "自己的文章就别点赞了吧" };
    return;
  }

  let likesHistory = await DB.Likes.findOne({
    where: { article_id: article_id, user_id: ctx.id },
  });
  if (likesHistory) {
    ctx.body = { success: false, message: "禁止重复点赞" };
    return;
  }

  await DB.Likes.create({
    id: id(),
    article_id: article_id,
    user_id: ctx.id as number,
    create_time: new Date(),
  })
    .then(() => {
      ctx.body = { success: true, message: "点赞成功" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "点赞失败" };
      console.log(err);
    });
});
export default router;
