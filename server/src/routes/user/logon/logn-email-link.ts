import Router from "@koa/router";
import { cache, removeUserData } from "@/common/modules/cache/logon-email";
import jwt from "jsonwebtoken";
import qs from "qs";
import DB from "@/db";
import id from "@/common/utils/id";
import upload from "@/common/utils/static/upload";
import Identicon from "identicon.js";
import sha1 from "sha1";
let router = new Router();

import Joi from "joi";
import validator from "@/common/middleware/verify/validator";

const schema = Joi.object({
  key: Joi.string().length(40).required().error(new Error("Key的格式错误")),
});

router.get("/logon/email", validator(schema), async ctx => {
  function response(success: boolean, title: string, message?: string | string[], token?: string) {
    let query = qs.stringify(
      {
        success,
        title,
        message,
        href: "/",
        token,
      },
      {
        arrayFormat: "repeat",//query中的数组中不携带索引值
      }
    );
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
  let _id = id();
  var data = new Identicon(sha1(_id + ""), {
    size: 50,
    format: "svg",
    background: [240, 240, 240, 255],
  }).toString();

  let uploadResult = await upload(Buffer.from(data, "base64"), ["avatar", `${id()}.webp`])
    .then(res => ({ success: true, fileName: (res as any).file_name as string }))
    .catch(err => ({ success: false, errMes: err }));

  if (!uploadResult.success) {
    response(false, `注册失败`, [(uploadResult as any).errMes, "请稍后在试"]);
    return;
  }

  let logonResulte = await DB.User.create({
    id: _id,
    email: email,
    name: name,
    password: password,
    auth: 0,
    avatar_file_name: (uploadResult as any).fileName,
    create_time: new Date(),
  })
    .then(() => true)
    .catch(() => false);

  if (!logonResulte) {
    response(false, `注册失败`, "服务器注册错误");
    return;
  }

  let token = jwt.sign(
    {
      id: _id,
      auth: 0,
    },
    process.env.KEY as string,
    { expiresIn: "365d" }
  );
  response(true, "注册成功", "", token);
  removeUserData(email);
});
export default router;
