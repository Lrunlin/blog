import Router from "@koa/router";
import { cache, removeUserData } from "@/common/modules/cache/logon-email";
import jwt from "jsonwebtoken";
import qs from "qs";
import DB from "@/db";
import useId from "@/common/hooks/useId";
let router = new Router();

import Joi from "Joi";
import validator from "@/common/middleware/validator";
const schema = Joi.object({
  key: Joi.string().length(40).required().error(new Error("干点正事")),
});

router.get("/logon/email", validator(schema), async ctx => {
  function response(success: boolean, title: string, message?: string | string[], token?: string) {
    let query = qs.stringify({
      success,
      title,
      message,
      href:'/',
      token,
    });
    ctx.status = 302;
    ctx.redirect(`${process.env.CLIENT_HOST}/result?${query}`);
  }

  let key = ctx.query.key;

  // 如果没有key
  if (!key) {
    response(false, "错误的激活链接!");
    return;
  }

  // 携带了key但是缓存中没有找到
  if (!cache.has(key)) {
    response(false, "您的链接错误", [
      "链接有效期15分钟请返回注册窗口重新发送链接",
      "链接在注册成功后会直接销毁",
    ]);
    return;
  }

  interface userDataType {
    email: string;
    password: string;
    name: string;
  }

  let { email, name, password } = cache.get(key) as userDataType;

  //   判断是否已经注册了
  let { count } = await DB.User.findAndCountAll({ where: { email: email } });
  if (count) {
    response(false, "激活失败", [
      `您的邮箱:${email}已注册`,
      "请打开登录窗口进行登录",
      "如果您忘记了密码请打开相应窗口发送激活链接",
    ]);
    return;
  }

  let id = useId();
  await DB.User.create({
    id: id,
    email: email,
    name: name,
    password: password,
    auth: 0,
    avatar_file_name: "default.webp",
    create_time: new Date(),
  })
    .then(res => {
      let token = jwt.sign(
        {
          id: id,
          auth: 0,
        },
        process.env.KEY as string,
        { expiresIn: "365d" }
      );
      response(true, "注册成功", "", token);
      removeUserData(email);
    })
    .catch(err => {
      response(false, `注册失败`, "服务器注册错误");
      console.log(err);
    });
});
export default router;
