import Router from "@koa/router";
import DB from "@/db";
import auth from "@/common/middleware/auth";
import upload from "@/common/utils/static/upload";
import Identicon from "identicon.js";
import sha1 from "sha1";
import id from "@/common/utils/id";

let router = new Router();
router.post("/user/destroy", auth(0), async ctx => {
  if (ctx.auth != 0) {
    ctx.body = { success: false, message: "只有普通用户才能注销账号" };
    ctx.status = 500;
  }
  let data = new Identicon(sha1(ctx.id + ""), {
    size: 80,
    format: "svg",
    background: [240, 240, 240, 255],
  }).toString();

  let uploadResult = await upload(Buffer.from(data, "base64"), {
    folder: "avatar",
    file_name: `${id()}.webp`,
  })
    .then(res => ({ success: true, fileName: (res as any).file_name as string }))
    .catch(err => ({ success: false, errMes: err }));

  if (!uploadResult.success) {
    ctx.body = { success: false, message: "注销失败，请稍后再试" };
    return;
  }

  await DB.User.update(
    {
      name: `用户-${ctx.id}`,
      github: null as any,
      qq: null as any,
      email: `1@qq.com`,
      description: null as any,
      location: null as any,
      site: null as any,
      unit: null as any,
      avatar_file_name: (uploadResult as any).fileName,
      password: Math.random() + process.env.SITE_API_HOST + +new Date(),
    },
    {
      where: { id: ctx.id },
    }
  )
    .then(([row]) => {
      if (row) {
        ctx.body = { success: true, message: "注销成功" };
      } else {
        ctx.body = { success: false, message: "注销失败" };
        ctx.status = 500;
      }
    })
    .catch(err => {
      ctx.body = { success: false, message: "注销失败" };
      ctx.status = 500;
      console.log(err);
    });
});
export default router;
