import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/problem/create";

let router = new Router();
router.post("/problem", verify, async (ctx) => {
  let _id = id();
  const { title, tag, content } = ctx.request.body;

  let t = await sequelize.transaction();

  /** 创建文章标签数组 */
  let articleTagData = tag.map((item: any) => ({
    id: id(),
    belong_id: _id,
    type: "problem",
    tag_id: item,
  }));

  /** 创建文章标签和文章的绑定*/
  let articleTagResult = await DB.ArticleTag.bulkCreate(articleTagData, {
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  let result = await DB.Problem.create(
    {
      id: _id,
      title,
      content,
      create_time: new Date(),
      view_count: 0,
      theme_id: 0,
      author: ctx.id as number,
    },
    { transaction: t },
  )
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      ctx.body = { success: false, message: "发布失败" };
      return false;
    });
  if (articleTagResult && result) {
    t.commit();
    ctx.body = { success: true, message: "发布成功", data: _id };
  } else {
    t.rollback();
    ctx.status = 500;
    ctx.body = { success: false, message: "发布失败" };
  }
});
export default router;
