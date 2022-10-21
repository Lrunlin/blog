import Router from "@koa/router";
import DB from "@/db";
import id from "@/common/utils/id";
import verify from "@/common/verify/api-verify/links/create";
import auth from "@/common/middleware/auth";

let router = new Router();

router.post("/links", verify, auth(0), async ctx => {
  let { name, url, logo_file_name } = ctx.request.body;
  await DB.Links.create({
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
      ctx.body = { success: false, message: "发送失败" };
      console.log(err);
    });
});
export default router;
