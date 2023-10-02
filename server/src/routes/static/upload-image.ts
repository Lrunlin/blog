import Router from "@koa/router";
import type { Context, Next } from "koa";
let router = new Router();
import multer from "@koa/multer";
import { v4 } from "uuid";
import auth from "@/common/middleware/auth";
import upload from "@/common/utils/static/upload";
import { folderList } from "@/common/utils/static/upload";

let uploadOption = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 5, //5MB
  },
});

function verify() {
  return async (ctx: Context, next: Next) => {
    if (folderList.some(item => item.folder == ctx.params.folder)) {
      await next();
    } else {
      ctx.body = {
        success: false,
        message: "请上传至正确的路径",
      };
    }
  };
}

router.post("/static/:folder", auth(0), verify(), uploadOption.single("image"), async ctx => {
  let buffer = ctx.file.buffer;

  let fileName = `${v4().replace(/-/g, "")}.webp`;

  await upload(buffer, {
    file_name: fileName,
    folder: ctx.params.folder,
  })
    .then(data => {
      ctx.body = { success: true, message: "上传成功", data: data };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = { success: false, message: err };
    });
});
export default router;
