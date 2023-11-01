import Router from "@koa/router";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import sha256 from "@/common/utils/sha256";

const schema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(16)
    .required()
    .pattern(/^[a-zA-Z0-9_]{8,16}$/)
    .error(new Error("密码格式错误")),
});

let router = new Router();
// 修改密码
router.put("/user/password", validator(schema), auth(0), async ctx => {
  let { password } = ctx.request.body;
  let userData = await DB.User.findByPk(ctx.id, { attributes: ["password"] });
  if (userData?.password == sha256(password)) {
    ctx.body = { success: false, message: "新旧密码不得相同" };
    return;
  }

  await DB.User.update({ password: password }, { where: { id: ctx.id } })
    .then(([res]) => {
      ctx.body = { success: true, message: "修改成功" };
    })
    .catch(err => {
      ctx.body = { success: false, message: "修改失败" };
      console.log(err);
    });
});
export default router;
