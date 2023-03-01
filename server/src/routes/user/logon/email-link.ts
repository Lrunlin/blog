import Router from "@koa/router";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import sendEmail from "@/common/utils/email";
import { setUserData, getRemainingTTL, createKey, hasKey } from "@/common/modules/cache/email";
import DB from "@/db";

let router = new Router();
const schema = Joi.object({
  email: Joi.string().min(5).max(30).required().email().error(new Error("邮箱为5-30的字符串")),
  name: Joi.string().min(1).max(12).required().error(new Error("昵称为1-12的字符串")),
  password: Joi.string()
    .min(1)
    .max(16)
    .required()
    .pattern(/^[a-zA-Z0-9_]{8,16}$/)
    .error(new Error("密码由8-16位的数字、字母或者下划线组成")),
});

// 向指定邮箱发送注册验证码
router.post("/email/link", validator(schema), async ctx => {
  let email = ctx.request.body.email;

  let { count: existEmailCount } = await DB.User.findAndCountAll({ where: { email: email } });

  if (existEmailCount) {
    ctx.body = { success: false, message: `已经存在绑定该邮箱的用户，请使用找回密码功能` };
    return;
  }

  let minute = Math.floor(Math.floor(await getRemainingTTL(email)) / 60);

  //  如果非零,并且剩余时间大于5分钟
  if ((await hasKey(createKey(email))) && minute > 5) {
    ctx.body = { success: false, message: `链接已发送并剩余时间:${minute}分钟,请前往邮箱点击链接` };
    return;
  }
  let href = `${process.env.SITE_API_HOST}/logon/email`;
  let content = `
  <b>你好：</b>
  <p>您正在网站${process.env.SITE_NAME}使用邮箱进行账号注册</p>
  <p>如果是您本人进行操作，请点击以下链接，否则请忽略</p>
  <br/>
  <a href="${href}?key=${createKey(email)}" target="_blank">${href}</a>
  `;
  
  await sendEmail({ target: email, subject: `${process.env.SITE_NAME}-注册`, content })
    .then(res => {
      ctx.body = { success: true, message: "激活邮件发送成功，请在15分钟内点击" };
      setUserData(ctx.request.body);
    })
    .catch(err => {
      ctx.body = { success: false, message: "激活邮件发送失败" };
      console.log(err);
    });
});
export default router;
