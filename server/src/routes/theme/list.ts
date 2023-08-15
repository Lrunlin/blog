import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";

let router = new Router();

router.get("/theme", auth(), async ctx => {
  let isAll = ctx.request.query.all;

  await DB.Theme.findAll({
    attributes: { exclude: ["content"] },
    order: [["indexes", "asc"]],
    where: isAll ? undefined : { state: 1 },
  })
    .then(rows => {
      ctx.body = { success: true, message: "查询成功", data: rows };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "服务器查询错误" };
    });
});
export default router;
