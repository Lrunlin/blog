import Router from "@koa/router";
import DB from "@/db";
import Joi from "joi";
import validator from "@/common/middleware/verify/validator";
import redis from "@/common/utils/redis";

const schema = Joi.object({
  key: Joi.string().min(60).max(100).required().error(new Error("缺少key")),
  password: Joi.string()
    .min(8)
    .max(16)
    .required()
    .pattern(/^[a-zA-Z0-9_]{8,16}$/)
    .error(new Error("密码格式错误")),
});

let router = new Router();

router.post("/forget-password/update", validator(schema), async ctx => {
  let { key, password } = ctx.request.body;

  let email = await redis.get(`forget-password-${key}`);
  if (!email) {
    ctx.status = 500;
    ctx.body = { success: false, message: "链接无效" };
    return;
  }

  await DB.User.update(
    { password: password },
    {
      where: { email: email },
    }
  )
    .then(([count]) => {
      if (count) {
        ctx.body = { success: true, message: "修改成功" };
        redis.del(`forget-password-${key}`);
      } else {
        ctx.body = { success: false, message: "修改失败" };
        ctx.status = 500;
      }
    })
    .catch(err => {
      ctx.body = { success: false, message: "修改失败" };
      ctx.status = 500;
    });
});
export default router;
