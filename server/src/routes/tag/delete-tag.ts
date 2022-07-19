import Router from "@koa/router";
import DB from "@/db";
import sequelize from "@/db/config";
let router = new Router();

router.delete("/tag/:id", async ctx => {
  let { id } = ctx.params;

  try {
    const result = await sequelize.transaction(async t => {
      let deleteTag = await DB.Tag.destroy({
        where: {
          id: id,
        },
      });
      //将 ,id,   ,id   id,   id  四种方法全部置换
      await sequelize.query(
        `update article set tag=REPLACE (tag,',${id},','') WHERE tag like '%${id}%'`
      );
      await sequelize.query(
        `update article set tag=REPLACE (tag,',${id}','') WHERE tag like '%${id}%'`
      );
      await sequelize.query(
        `update article set tag=REPLACE (tag,'${id},','') WHERE tag like '%${id}%'`
      );
      await sequelize.query(
        `update article set tag=REPLACE (tag,'${id}','') WHERE tag like '%${id}%'`
      );
      return !!deleteTag;
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
