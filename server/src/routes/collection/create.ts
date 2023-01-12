import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/collection/create";
let router = new Router();
router.post("/collection/:belong_id", verify, async ctx => {
  let belong_id = +ctx.params.belong_id;

  let articleAuthor = await DB.Article.findByPk(belong_id, { attributes: ["author"] });
  if (!articleAuthor) {
    ctx.body = { success: false, message: "没有找到对应的文章" };
    return;
  }

  if (articleAuthor.author == ctx.id) {
    ctx.body = { success: false, message: "自己的文章就别收藏了吧" };
    return;
  }

  let collectionHistory = await DB.Collection.findOne({
    where: { belong_id: belong_id, user_id: ctx.id },
  });
  if (collectionHistory) {
    ctx.body = { success: false, message: "禁止重复收藏" };
    return;
  }

  await DB.Collection.create({
    id: id(),
    belong_id: belong_id,
    type: ctx.request.body.type as string,
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
