import Router from "@koa/router";
import DB from "@/db";

let router = new Router();
router.delete("/type/:id", async ctx => {
  let { id } = ctx.params;

  let { count } = await DB.Tag.findAndCountAll({
    where: {
      belong: id,
    },
  });

  //如果有子标签则禁止删除
  if (count) {
    ctx.body = { success: false, message: "禁止删除包含标签的类型" };
    return;
  }

  await DB.Type.destroy({
    where: {
      id: id,
    },
  })
    .then(row => {
      let isSuccess = !!row;
      ctx.body = {
        success: isSuccess,
        message: isSuccess ? `删除成功` : "删除失败",
      };
    })
    .catch((err: any) => {
      ctx.body = { success: false, message: `删除失败` };
      console.log(err);
    });
});
export default router;
