import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
import { Op } from "sequelize";

let router = new Router();

router.delete("/tag/:id", async ctx => {
  let { id } = ctx.params;
  const t = await sequelize.transaction();
  let deleteTagCount = await DB.Tag.destroy({
    where: {
      id: id,
    },
    transaction: t,
  });

  /** 需要删除的个数*/
  let { count: tagCount } = await DB.Article.findAndCountAll({
    where: { tag: { [Op.substring]: id } },
  });
  //将文章表中的 ,id,  ,id   id,   id  四种方法全部置换
  let replaceTagIdResult = await Promise.all<any>([
    sequelize.query(`update article set tag=REPLACE (tag,',${id},',',') WHERE tag like '%${id}%'`, {
      transaction: t,
    }),
    sequelize.query(`update article set tag=REPLACE (tag,',${id}','') WHERE tag like '%${id}%'`, {
      transaction: t,
    }),
    sequelize.query(`update article set tag=REPLACE (tag,'${id},','') WHERE tag like '%${id}%'`, {
      transaction: t,
    }),
    sequelize.query(`update article set tag=REPLACE (tag,'${id}','') WHERE tag like '%${id}%'`, {
      transaction: t,
    }),
  ]).then(res => {
    // 实际删除了多少
    let _tagCount = res.reduce((total, item) => {
      return total + item[0].affectedRows;
    }, 0);
    if (_tagCount != tagCount) {
      console.log(`删除 ${id} 时 置换数量对不上${_tagCount}/${tagCount}`);
      return false;
    } else {
      return true;
    }
  });

  if (!(deleteTagCount && replaceTagIdResult)) {
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
