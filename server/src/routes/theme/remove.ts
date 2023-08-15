import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
import verify from '@/common/verify/api-verify/theme/remove'

let router = new Router();

router.delete("/theme/:id", verify, async ctx => {
  let t = await sequelize.transaction();

  //   需要将使用到主题的文章的主题ID换成默认ID
  try {
    await DB.Article.update({ theme_id: 0 }!, {
      where: { theme_id: +ctx.params.id },
      transaction: t,
    });

    await DB.Theme.destroy({
      where: { id: ctx.params.id },
      transaction: t,
    });
    ctx.body = { success: true, message: "删除成功" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { success: false, message: "删除失败" };
    console.log(error);
  }
});
export default router;
