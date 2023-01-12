import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/like/create";
let router = new Router();

router.post("/like/:belong_id", verify, async ctx => {
  let belong_id = +ctx.params.belong_id;
  let type = ctx.request.body.type as string;

  let articleAuthor = await DB.Article.findByPk(belong_id, { attributes: ["author"] });
  if (!articleAuthor) {
    ctx.body = { success: false, message: "没有找到对应的文章" };
    return;
  }

  if (articleAuthor.author == ctx.id) {
    ctx.body = { success: false, message: "自己的文章就别点赞了吧" };
    return;
  }

  let likeHistory = await DB.Likes.findOne({
    where: { belong_id: belong_id, user_id: ctx.id },
  });
  if (likeHistory) {
    ctx.body = { success: false, message: "禁止重复点赞" };
    return;
  }

  await DB.Likes.create({
    id: id(),
    belong_id: belong_id,
    type,
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
