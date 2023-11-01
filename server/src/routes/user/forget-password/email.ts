import Router from "@koa/router";
import DB from "@/db";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import sendEmail from "@/common/utils/email";
import redis from "@/common/utils/redis";
import sha256 from "@/common/utils/sha256";

const schema = Joi.object({
  email: Joi.string().min(5).max(30).required().email().error(new Error("邮箱不正确")),
});

let router = new Router();

router.post("/forget-password/email/:email", validator(schema, true), async ctx => {
  let email = ctx.params.email;
  let row = await DB.User.findOne({
    where: { email: email },
    attributes: ["email", "id", "password"],
    raw: true,
  });
  if (!row?.email) {
    ctx.body = { success: false, message: "账号不存在" };
    return;
  }
  let key = sha256(row.id + row.email + row.password) + row.id;

  let content = `
<div>你的<a href="${process.env.CLIENT_HOST}">${process.env.SITE_NAME}</a>账号正在执行找回密码,邮箱:${email}</div>
<div>如果是您本人操作请点击链接:<a href="${process.env.CLIENT_HOST}/forget-password?key=${key}">找回链接</a></div>
<pre>${process.env.CLIENT_HOST}/find-password?key=${key}</pre>
`;

  await sendEmail({
    subject: "找回密码链接",
    target: email,
    content: content,
  })
    .then(() => {
      ctx.body = {
        success: true,
        message: "已将重置密码链接发送至您的邮箱,请注意查收(有效时间15分钟)",
      };
      redis.set(`forget-password-${key}`, email, "EX", 900);
    })
    .catch(err => {
      ctx.body = { success: false, message: "邮箱服务器发送失败" };
      console.log(err);
    });
});
export default router;
