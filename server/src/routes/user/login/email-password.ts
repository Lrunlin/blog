import Router from "@koa/router";
import DB from "@/db";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import sign from "@/common/utils/auth/sign";
import sha256 from "@/common/utils/sha256";
import isEmailDestroy from "@/common/modules/user/isEmailDestroy";

const schema = Joi.object({
  email: Joi.string().min(5).max(30).required().email().error(new Error("邮箱格式不正确")),
  password: Joi.string()
    .min(8)
    .max(16)
    .required()
    .pattern(/^[a-zA-Z0-9_]{8,16}$/)
    .error(new Error("密码格式错误")),
});

let router = new Router();
router.post("/login/email", validator(schema), async ctx => {
  let { email, password } = ctx.request.body;

  if (await isEmailDestroy(email)) {
    ctx.status = 500;
    ctx.body = { success: false, message: `你的邮箱已被注销，请更换邮箱重新尝试` };
    return;
  }

  await DB.User.findOne({
    where: {
      email: email,
      password: sha256(password),
      state: 1,
    },
    attributes: ["id", "name", "auth", "avatar_file_name", "avatar_url"],
  })
    .then(async row => {
      if (!row) {
        ctx.status = 500;
        ctx.body = { success: false, message: "邮箱或密码错误" };
        return;
      }
      let token = await sign({
        id: row.id,
        auth: row.auth,
      });
      ctx.body = { success: true, message: "登录成功", token: token, data: row };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: "登录失败" };
      console.log(err);
    });
});
export default router;
