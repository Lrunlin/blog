import Router from "@koa/router";
import DB from "@/db";
import useID from "@/common/hooks/useId";
import verify from "@/common/verify/api-verify/links/create";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import auth from "@/common/middleware/auth";



let router = new Router();

router.post("/links", verify, auth(0), async ctx => {
  let { name, url, logo_file_name } = ctx.request.body;
  let id = useID();
  await DB.Links.create({
    id,
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
