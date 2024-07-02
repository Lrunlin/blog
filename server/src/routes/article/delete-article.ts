import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
import auth from "@/common/middleware/auth";
import transaction from "@/common/transaction/article/delete-article";
import interger from "@/common/verify/integer";

let router = new Router();

router.delete("/article/:id", interger([], ["id"]), auth(0), async (ctx) => {
  let id = +ctx.params.id;
  let where: { id: number | string; author?: number } = {
    id: id,
  };
  if (ctx.auth != 1) {
    where.author = ctx.id;
  }

  let t = await sequelize.transaction();
  let deleteArticleCount = await DB.Article.destroy({
    where: where,
    transaction: t,
  });

  let _t = await transaction(id, t);
  ctx.body = {
    success: _t && deleteArticleCount,
    message: _t && deleteArticleCount ? `删除成功` : "删除失败",
  };

  if (_t && deleteArticleCount) {
    t.commit();
  } else {
    t.rollback();
  }
});
export default router;
