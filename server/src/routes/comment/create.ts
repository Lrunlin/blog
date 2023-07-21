import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/comment/create";
import transaction from "@/common/transaction/comment/create-comment";
import sequelize from "@/db/config";

let router = new Router();
router.post("/comment", verify, async ctx => {
  let { belong_id, reply, content, comment_pics, type } = ctx.request.body;
  let _id = id();

  let t = await sequelize.transaction();

  // 有上级评论就创建评论回复通知，没有上级评论就创建文章评论通知
  let _t = await transaction(_id, reply, ctx.id as number, belong_id as number, type, t);

  let r = await DB.Comment.create(
    {
      id: _id,
      belong_id: belong_id,
      type,
      reply,
      content,
      comment_pics,
      create_time: new Date(),
      user_id: ctx.id as number,
      is_review: 0,
    },
    { transaction: t }
  ).catch(() => false as false);

  if (r && _t.success) {
    ctx.body = { success: true, message: "评论成功" };
    await t.commit();
  } else {
    ctx.body = { success: false, message: "评论失败" };
    ctx.status = 500;
    await t.rollback();
  }
});
export default router;
