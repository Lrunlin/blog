import Router from "@koa/router";
import DB from "@/db";
import ejs from "ejs";
import fs from "fs";
import Joi from "joi";
import auth from "@/common/middleware/auth";
import validator from "@/common/middleware/verify/validator";
import {
  createKey,
  getRemainingTTL,
  setUserEmail,
} from "@/common/modules/cache/email";
import sendEmail from "@/common/utils/email";

let router = new Router();
const option = Joi.object({
  email: Joi.string().email(),
});
// 发送修改邮箱的链接
router.put("/user/email", auth(0), validator(option), async (ctx) => {
  let email = ctx.request.body.email as string; //新邮箱

  //检测防止新旧链接重复
  let userData = await DB.User.findByPk(ctx.id, {
    attributes: ["name", "email"],
  });
  if (!userData) return false;

  if (userData.email == email) {
    ctx.body = { success: false, message: "新旧邮箱不得相同" };
    return;
  }

  //   检测要求缓存中没有保存链接或者链接时间小于5分钟
  if ((await getRemainingTTL(userData.email)) > 300) {
    ctx.body = {
      success: false,
      message: "链接剩余时间超过5分钟请前往邮箱激活",
    };
    return;
  }

  // 查看信息邮箱是否已经绑定账户
  let emailExist = await DB.User.findOne({
    where: { email: email },
    attributes: ["name"],
  });
  if (emailExist) {
    ctx.body = {
      success: false,
      message: `该邮箱已经绑定了用户: ${emailExist.name}`,
    };
    return;
  }

  //开始发送邮件
  let href = `${process.env.SITE_API_HOST}/user/update-email?key=${createKey(userData.email)}`;
  const content = ejs.render(
    fs.readFileSync("src/views/update-email.ejs").toString(),
    {
      site_name: process.env.SITE_NAME,
      user_name: userData?.name,
      href: href,
    },
  );

  await sendEmail({ target: email, subject: "修改邮箱", content: content })
    .then(() => {
      ctx.body = {
        success: true,
        message: `发送成功快去邮箱激活吧(有效时间15分钟)`,
      };
      setUserEmail(userData?.email as string, email);
    })
    .catch((err) => {
      ctx.body = { success: false, message: `发送失败` };
    });
});
export default router;
