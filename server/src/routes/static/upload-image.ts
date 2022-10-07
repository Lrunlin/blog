import Router from "@koa/router";
import type { Context, Next } from "koa";
let router = new Router();
import multer from "@koa/multer";
import { v4 } from "uuid";
import auth from "@/common/middleware/auth";
import upload from "@/common/utils/static/upload";

let uploadOption = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 30, //3mb
  },
});

function verify() {
  const folderList = ["article", "avatar", "cover", "type", "comment", "advertisement", "links"];
  return async (ctx: Context, next: Next) => {
    if (folderList.includes(ctx.params.folder)) {
      await next();
    } else {
      ctx.body = {
        success: false,
        message: "已经记录日志了",
      };
      console.log(`id: ${ctx.id} 尝试瞎上传图片`);
    }
  };
}

router.post("/static/:folder", auth(0), verify(), uploadOption.single("image"), async ctx => {
  let buffer = ctx.file.buffer;

  const mimetype = ctx.file.mimetype == "image/gif" ? "gif" : "webp";
  let fileName = `${v4().replace(/-/g, "")}.${mimetype}`;

  await upload(buffer, [ctx.params.folder, fileName])
    .then(data => {
      ctx.body = { success: true, message: "上传成功", data: data };
    })
    .catch(err => {
      ctx.body = { success: false, message: err };
    });
});
export default router;
