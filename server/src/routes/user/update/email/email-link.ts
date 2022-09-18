import Router from "@koa/router";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import auth from "@/common/middleware/auth";
import sendEmail from "@/common/utils/email";
import { getRemainingTTL, createKey, setUserEmail } from "@/common/modules/cache/update-email";
import DB from "@/db";

let router = new Router();
const option = Joi.object({
  email: Joi.string().email(),
});
// 发送修改邮箱的链接
router.put("/user/email", auth(0), validator(option), async ctx => {
  let { email } = ctx.request.body;
  //   检测要求缓存中没有保存链接或者链接时间小于5分钟
  if (getRemainingTTL(ctx.id as number) > 300_000) {
    ctx.body = { success: false, message: "链接剩余时间超过5分钟请前往邮箱激活" };
    return;
  }

  //   检测防止新旧链接重复
  let userData = await DB.User.findByPk(ctx.id, { attributes: ["name", "email"] });
  if (userData?.email == email) {
    ctx.body = { success: false, message: "新旧邮箱不得相同" };
    return;
  }

  // 查看信息邮箱是否已经绑定账户
  let emailExist = await DB.User.findOne({ where: { email: email }, attributes: ["name"] });
  if (emailExist) {
    ctx.body = { success: false, message: `该邮箱已经绑定了用户: ${emailExist.name}` };
    return;
  }

  //开始发送邮件
  let href = `${process.env.SITE_API_HOST}/user/update-email?key=${createKey(ctx.id as number)}`;
  const content = `
<h2>修改邮箱</h2>
<div>您的${process.env.SITE_NAME}账号:${userData?.name}请求绑定此邮箱</div>
<div>如果这不是您本人操作请忽略此邮件</div>
<a href="${href}">如果您这是您的本人操作请点击本链接:<pre>${href}</pre></a>
`;
  await sendEmail({ target: email, subject: "修改邮箱", content: content })
    .then(() => {
      setUserEmail(ctx.id as number, email);
      ctx.body = { success: true, message: `发送成功快去邮箱激活吧(有效时间15分钟)` };
    })
    .catch(err => {
      ctx.body = { success: false, message: `发送失败` };
    });
});
export default router;
