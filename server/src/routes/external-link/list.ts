import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
let router = new Router();

router.get("/external-link", auth(), async ctx => {
  await DB.ExternalLink.findAll({ order: [["create_time", "desc"]] })
    .then(rows => {
      ctx.body = { success: true, message: "查询外联列表", data: rows };
    })
    .catch(err => {
      console.log(err);
      ctx.status = 500;
      ctx.body = { success: false, message: "查询外联列表失败" };
    });
});
export default router;
