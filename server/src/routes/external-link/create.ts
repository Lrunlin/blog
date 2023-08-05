import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import verify from "@/common/verify/api-verify/external-link/create";
import id from "@/common/utils/id";
let router = new Router();

router.post("/external-link", verify, auth(), async ctx => {
  let href = ctx.request.body.href;
  await DB.ExternalLink.create({ id: id(), href: href, create_time: new Date() })
    .then(res => {
      ctx.body = { success: true, message: "添加成功" };
    })
    .catch(err => {
      console.log(err);
      ctx.status = 500;
      ctx.body = { success: false, message: "添加失败" };
    });
});
export default router;
