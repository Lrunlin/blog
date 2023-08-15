import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/article/create-article";
import transaction from "@/common/transaction/article/create-article";

let router = new Router();
router.post("/article", verify, async ctx => {
  let { title, description, cover_file_name, reprint, content, tag, state, theme_id } =
    ctx.request.body;
  let _id = id();
  let t = await sequelize.transaction();
  // 只有正式发布才创建通知(转载文章不发布通知)
  let _t = state == 1 && !reprint ? await transaction(_id, ctx.id as number, t) : true;
  let createArticleResult = await DB.Article.create(
    {
      id: _id,
      title: title,
      description: description,
      cover_file_name: cover_file_name,
      reprint: reprint,
      content: content,
      author: ctx.id as number,
      tag: tag,
      state: state,
      view_count: 0,
      theme_id,
      create_time: new Date(),
    },
    { transaction: t }
  )
    .then(() => true)
    .catch(() => false);

  if (createArticleResult && _t) {
    ctx.body = { success: true, message: `发布成功`, data: { article_id: _id } };
    t.commit();
  } else {
    ctx.status = 500;
    ctx.body = { success: false, message: "发布失败" };
    t.rollback();
  }
});
export default router;
