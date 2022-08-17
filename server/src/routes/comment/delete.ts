import Router from "@koa/router";
import authMiddleware from "@/common/middleware/auth";
import sequelize from "@/db/config";
import DB from "@/db";

/** 根据传递的评论ID查找出全部子评论的ID*/
async function collectCommentID(id: number) {
  let idHub: number[] = [id];
  async function _collectCommentID(_id: number) {
    await DB.Comment.findAll({ where: { reply: _id }, attributes: ["id"] }).then(async rows => {
      for (let index = 0; index < rows.length; index++) {
        const id = rows[index].id;
        idHub.push(id);
        await _collectCommentID(id);
      }
    });
  }
  await _collectCommentID(id);
  return idHub;
}

let router = new Router();
router.delete("/comment/:id", authMiddleware([0, 1]), async ctx => {
  let id = await collectCommentID(+ctx.params.id);

  try {
    await sequelize
      .transaction(async t => {
        return await DB.Comment.destroy({
          where: { id: id },
          transaction: t,
        });
      })
      .then(count => {
        ctx.body = { success: !!count, message: count ? "删除成功" : "删除失败" };
      });
  } catch (error) {
    ctx.body = { success: false, message: "删除失败" };
  }
});
export default router;