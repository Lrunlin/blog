import Router from "@koa/router";
import DB from "@/db";
import interger from "@/common/verify/integer";
import authMiddleware from "@/common/middleware/auth";
let router = new Router();

router.put("/tag/:id", interger([], ["id"]),authMiddleware(), async ctx => {
  let { name, indexes, icon_file_name, belong } = ctx.request.body;
  let { id } = ctx.params;
  await DB.Tag.update(
    {
      name,
      indexes,
      icon_file_name,
      belong,
    },
    { where: { id: id } }
  )
    .then(rows => {
      ctx.body = { success: !!rows[0], message: `${rows[0]}行数据受到影响` };
    })
    .catch(err => {
      ctx.body = { success: false, message: `修改错误` };
      console.log(err);
    });
});
export default router;
