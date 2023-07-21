import Router from "@koa/router";
import authMiddleware from "@/common/middleware/auth";
import sequelize from "@/db/config";
import DB from "@/db";
import interger from "@/common/verify/integer";
import getCommentChildrenList from "@/common/modules/comment/get-comment-childrnen-list";
import transaction from "@/common/transaction/comment/delete-comment";

let router = new Router();
router.delete("/comment/:id", interger([], ["id"]), authMiddleware(0), async ctx => {
  // 如果不是管理员那就验证身份
  if (ctx.id != 1) {
    let userID = await DB.Comment.findByPk(+ctx.params.id, { attributes: ["user_id"] });
    if (userID?.user_id != ctx.id) {
      ctx.body = { success: false, message: "只能删除自己的评论哦" };
      return;
    }
  }
  let t = await sequelize.transaction();
  let id = await getCommentChildrenList(+ctx.params.id);
  let _t = await transaction(id, t);
  let result = await DB.Comment.destroy({
    where: { id: id },
    transaction: t,
  })
    .then(count => !!count)
    .catch(() => false);
  if (result && _t) {
    ctx.body = { success: true, message: "删除成功" };
    t.commit();
  } else {
    ctx.status = 500;
    ctx.body = { success: false, message: "删除失败" };
    t.rollback();
  }
});
export default router;
