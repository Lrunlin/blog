import Router from "@koa/router";
import DB from "@/db";
import Joi from "Joi";
import validator from "@/common/middleware/validator";
import sendEmail from "@/common/utils/email";

const schema = Joi.object({
  email: Joi.string().min(5).max(30).required().email().error(new Error("邮箱不正确")),
});

let router = new Router();

router.post("/forget-password/email/:email", validator(schema, true), async ctx => {
  let email = ctx.params.email;
  let { count, rows } = await DB.User.findAndCountAll({
    where: { email: email },
    attributes: ["email", "password"],
  });
  if (!count) {
    ctx.body = { success: false, message: "账号不存在" };
    return;
  }

  let content = `
<div>邮箱:${email}，密码:${rows[0].password}</div>
`;

  await sendEmail({
    subject: "找回密码",
    target: email,
    content: content,
  })
    .then(() => {
      ctx.body = { success: true, message: "已将密码发送至您的邮箱，请注意查收" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "邮箱服务器发送失败" };
      console.log(err);
    });
});
export default router;
