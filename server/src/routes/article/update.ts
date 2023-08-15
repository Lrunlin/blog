import Router from "@koa/router";
import DB from "@/db";
let router = new Router();
import verify from "@/common/verify/api-verify/article/update-article";
import sequelize from "@/db/config";
import transaction from "@/common/transaction/article/create-article";
router.put("/article/:id", verify, async ctx => {
  let { title, description, cover_file_name, reprint, content, tag, view_count, state, theme_id } =
    ctx.request.body;
  let id = +ctx.params.id as number;
  let where: { id: number; author?: number } = {
    id: id,
  };

  if (ctx.auth != 1) {
    where.author = ctx.id;
  }

  /** 如果state本来就是1那么就不接受修改否则可以修改*/
  let oldState = await DB.Article.findByPk(id, { attributes: ["state"], raw: true })
    .then(res => {
      if (res) {
        return res.state;
      } else {
        ctx.body = { success: false, message: "修改错误" };
        return null;
      }
    })
    .catch(() => {
      ctx.body = { success: false, message: "修改错误" };
      return null;
    });

  if (typeof oldState != "number") {
    return;
  }

  let t = await sequelize.transaction();
  let updateResult = await DB.Article.update(
    {
      title: title,
      description: description,
      cover_file_name: cover_file_name,
      reprint: reprint,
      content: content,
      tag: tag,
      state: oldState == 1 ? 1 : state,
      update_time: new Date(),
      theme_id,
      view_count: ctx.auth == 1 ? view_count : undefined,
    },
    {
      where: where,
      transaction: t,
    }
  )
    .then(result => !!result[0])
    .catch(() => false);

  // 说明是从草稿箱发布文章(非转载)
  let _t =
    (state = 1 && oldState == 0) && !reprint ? await transaction(id, ctx.id as number, t) : true;

  if (updateResult && _t) {
    ctx.body = { success: true, message: "修改成功" };
    t.commit();
  } else {
    ctx.status = 500;
    ctx.body = { success: false, message: "修改失败" };
    t.rollback();
  }
});
export default router;
