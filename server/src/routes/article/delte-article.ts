import Router from "@koa/router";
import auth from "@/common/middleware/auth";
import DB from "@/db";
import sequelize from "@/db/config";

let router = new Router();

router.delete("/article/:id", auth([0, 1]), async ctx => {
  let id = ctx.params.id;
  try {
    let where: { id: number | string; author?: number } = {
      id: id,
    };
    if (ctx.auth != 1) {
      where.author = ctx.id;
    }
    const result = await sequelize.transaction(async t => {
      let deleteArticleCount = await DB.Article.destroy({
        where: where,
        transaction:t,
      });
      await DB.Collection.destroy({
        where: {
          article_id: id,
        },
        transaction:t
      });
      await DB.Comment.destroy({
        where: {
          article_id: id,
        },
        transaction:t,
      });

      return !!deleteArticleCount;
    });
    ctx.body = {
      success: result,
      message: result ? `删除成功` : "删除失败",
    };
  } catch (error) {
    //回滚
    ctx.body = { success: false, message: `删除失败` };
  }
});
export default router;
