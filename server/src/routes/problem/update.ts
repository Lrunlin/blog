import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/problem/create";

let router = new Router();

router.put("/problem/:id", verify, async (ctx) => {
  const { title, tag, content } = ctx.request.body;

  let t = await sequelize.transaction();

  /** 先删除该文章的全部标签*/
  let articleTagDeleteResult = await DB.ArticleTag.destroy({
    where: { belong_id: ctx.params.id },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  /** 创建文章标签数组 */
  let articleTagData = tag.map((item: any) => ({
    id: id(),
    belong_id: ctx.params.id,
    type: "problem",
    tag_id: item,
  }));

  /** 创建文章标签和文章的绑定*/
  let articleTagResult = await DB.ArticleTag.bulkCreate(articleTagData, {
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  let result = await DB.Problem.update(
    {
      title,
      content,
    },
    { where: { author: ctx.id, id: ctx.params.id }, transaction: t },
  )
    .then((res) => true)
    .catch((err) => {
      console.log(err);
      return false;
    });
  if (result && articleTagResult && articleTagDeleteResult) {
    ctx.body = { success: true, message: "发布成功" };
    t.commit();
  } else {
    ctx.body = { success: false, message: "发布失败" };
    t.rollback();
  }
});
export default router;
