import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
import interger from "@/common/verify/integer";
import auth from "@/common/middleware/auth";
import stringArrayReplace from "@/db/utils/stringArrayReplace";

let router = new Router();

router.delete("/tag/:id", interger([], ["id"]), auth(), async ctx => {
  let { id } = ctx.params;

  //判断是否有文章只有这一个tag
  let allowDelete = await DB.Article.count({ attributes: ["id"], where: { tag: id } })
    .then(count => ({
      success: !count,
      mes: `有${count}篇文章只使用了这个Tag，需要在删除前进行处理。`,
    }))
    .catch(err => {
      console.log(err);
      return { success: false, mes: "检测使用Tag的文章数量时出错" };
    });

  if (!allowDelete.success) {
    ctx.status = 409; //请求与服务器的当前状态冲突，无法完成请求
    ctx.body = {
      success: false,
      message: allowDelete.mes,
    };
    return;
  }

  const t = await sequelize.transaction();
  let deleteTagCount = await DB.Tag.destroy({
    where: {
      id: id,
    },
    transaction: t,
  });

  let replaceTagIdResult = await stringArrayReplace(
    {
      tableName: "Article",
      field: "tag",
      oldValue: id,
      newValue: "",
    },
    {
      transaction: t,
    }
  );

  if (!(deleteTagCount && replaceTagIdResult)) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: "删除失败",
    };
    await t.rollback();
  } else {
    ctx.body = {
      success: true,
      message: "删除成功",
    };
    await t.commit();
  }
});
export default router;
