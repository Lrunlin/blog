import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/friendly-link/create";
import auth from "@/common/middleware/auth";

let router = new Router();

/** 在网站注册的用户可以发起申请*/
router.post("/friendly-link/apply", verify, auth(0), async ctx => {
  let { name, url, logo_file_name } = ctx.request.body;
  await DB.FriendlyLink.create({
    id: id(),
    user_id: ctx.id as number,
    name,
    url,
    logo_file_name,
    create_time: new Date(),
    state: 0,
  })
    .then(() => {
      ctx.body = { success: true, message: "申请成功，请等待邮箱回复结果" };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "申请失败" };
      console.log(err);
    });
});
export default router;
