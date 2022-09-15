import Router from "@koa/router";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import { getUserEmail } from "@/common/modules/cache/update-email";
import qs from "qs";
import DB from "@/db";

const schema = Joi.object({
  key: Joi.string().length(40).required().error(new Error("干点正事")),
});

let router = new Router();

// 接受修改用户邮箱字段的链接
router.get("/user/update-email", validator(schema), async ctx => {
  let { key } = ctx.query;
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
  if (!key) {
    response(false, "修改邮箱失败", "请使用正确的链接绑定邮箱");
    return;
  }
  let userData = getUserEmail(key + "") as { email: string; id: number };
  if (!userData) {
    response(false, "修改邮箱失败", [
      "信息获取错误",
      "1.链接有效时间为15分钟",
      "2.您可能点击了错误的链接",
      "3.您可能已经点击了链接并成功修改，请检查用户信息",
    ]);
    return;
  }

  let emailCount = await DB.User.findOne({ where: { email: userData.email } });
  if (emailCount) {
    response(false, "该邮箱已经绑定了用户");
    return;
  }

  let _userData = await DB.User.findOne({
    where: { id: userData.id },
    attributes: ["name", "email"],
  });
  if (_userData?.email == userData.email) {
    response(false, "修改失败", "两次链接不得相同");
    return;
  }

  await DB.User.update({ email: userData.email }, { where: { id: userData.id } })
    .then(([res]) => {
      response(true, "修改成功", `用户:${_userData?.name} 成功将邮箱修改为${userData?.email}`);
    })
    .catch(err => {
      response(false, "修改失败", `修改失败`);
      console.log(err);
    });
});
export default router;
