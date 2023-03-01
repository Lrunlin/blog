import Router from "@koa/router";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import { getUserEmail, removeKey } from "@/common/modules/cache/email";
import qs from "qs";
import DB from "@/db";

const schema = Joi.object({
  key: Joi.string().length(40).required().error(new Error("干点正事")),
});

let router = new Router();

// 接受修改用户邮箱字段的链接
router.get("/user/update-email", validator(schema), async ctx => {
  let key = ctx.query.key as string;
  function response(success: boolean, title: string, message?: string | string[]) {
    let query = qs.stringify({
      success: success,
      title: title,
      href: "/user/settings/account",
      message: message,
    });
    ctx.status = 302;
    ctx.redirect(`${process.env.CLIENT_HOST}/result?${query}`);
  }

  let userData = await getUserEmail(key);
  if (!userData) {
    response(false, "修改邮箱失败", [
      "信息获取错误",
      "1.链接有效时间为15分钟",
      "2.您可能点击了错误的链接",
      "3.您可能已经点击了链接并成功修改，请检查用户信息",
    ]);
    return;
  }

  let emailCount = await DB.User.findOne({ where: { email: userData.newEmail } });
  if (emailCount) {
    response(false, "该邮箱已经绑定了用户");
    return;
  }

  let _userData = await DB.User.findOne({
    where: { email: userData.email },
    attributes: ["name", "email"],
  });
  if (_userData?.email == userData.newEmail) {
    response(false, "修改失败", "两次邮箱不得相同");
    return;
  }

  await DB.User.update({ email: userData.newEmail }, { where: { email: userData.email } })
    .then(([res]) => {
      response(
        true,
        "修改成功",
        `用户:${_userData?.name}( ${(userData as any).email} ) 成功将邮箱修改为${
          userData?.newEmail
        }`
      );
      removeKey(key);
    })
    .catch(err => {
      response(false, "修改失败", [
        `可能发生的情况:`,
        "1.有别的账号成功修改了该邮箱",
        "2.服务器暂时发生错误",
        "3.服务器刚刚重启，请重新发送激活邮件",
      ]);
      console.log(err);
    });
});
export default router;
