import Router from "@koa/router";
import DB from "@/db";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import jwt from "jsonwebtoken";
import sha256 from "@/common/utils/sha256";

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

  await DB.User.findOne({
    where: {
      email: email,
      password: sha256(password),
    },
    attributes: ["id", "name", "auth", "avatar_file_name", "avatar_url"],
  })
    .then(row => {
      if (!row) {
        ctx.body = { success: false, message: "邮箱或密码错误" };
        return;
      }
      let token = jwt.sign(
        {
          id: row.id,
          auth: row.auth,
        },
        process.env.KEY as string,
        { expiresIn: "365d" }
      );
      ctx.body = { success: true, message: "登录成功", token: token, data: row };
    })
    .catch(err => {
      ctx.body = { success: false, message: "登录失败" };
      console.log(err);
    });
});
export default router;
