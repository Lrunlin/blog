import Router from "@koa/router";
import DB from "@/db";
let router = new Router();

router.put("/tag/:id", async ctx => {
  let { name, indexes, icon_url, belong } = ctx.request.body;
  let { id } = ctx.params;
  await DB.Tag.update(
    {
      name,
      indexes,
      icon_url,
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
