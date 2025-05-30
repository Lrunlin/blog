import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
import stringArrayReplace from "@/db/utils/stringArrayReplace";
import auth from "@/common/middleware/auth";
import interger from "@/common/verify/integer";

let router = new Router();

router.delete("/tag/:id", interger([], ["id"]), auth(), async (ctx) => {
  let { id } = ctx.params;

  //如果有子标签则禁止删除
  let { count } = await DB.Tag.findAndCountAll({
    where: {
      belong_id: id,
    },
  });
  if (count) {
    ctx.status = 409; //请求与服务器的当前状态冲突，无法完成请求
    ctx.body = { success: false, message: "禁止删除包含子标签的标签" };
    return;
  }

  //判断是否有文章只有这一个tag
  let allowDelete = await DB.ArticleTag.count({
    attributes: ["id"],
    where: { tag_id: id },
  })
    .then((count) => ({
      success: !count,
      mes: `有${count}篇文章只使用了这个Tag，需要在删除前进行处理。`,
    }))
    .catch((err) => {
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

  //开始创建事务 对文章标签进行置换和删除Tag
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
    },
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
