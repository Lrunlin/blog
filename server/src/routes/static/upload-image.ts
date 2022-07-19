import Router from "@koa/router";
let router = new Router();
import multer from "@koa/multer";
import sharp from "sharp";
import qiniu from "qiniu";
import { v4 } from "uuid";
import sync from "@/utils/useSync";
let config = new qiniu.conf.Config({
  zone: qiniu.zone.Zone_z2,
});

let upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 3, //3mb
  },
});

let accessKey = process.env.QINIU_AK;
let secretKey = process.env.QINIU_SK;
let bucket = process.env.OSS_NAME;

router.post("/static/:folder", upload.single("image"), async ctx => {
  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  let options = {
    scope: bucket,
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(mac);

  let buffer = ctx.file.buffer;
  let fileName = `${v4().replace(/-/g, "")}.webp`;

  var formUploader = new qiniu.form_up.FormUploader(config);
  var putExtra = new qiniu.form_up.PutExtra();

  await sync(resolve => {
    sharp(buffer)
      .webp({
        quality: 90,
        lossless: true,
      })
      .toBuffer()
      .then(data => {
        formUploader.put(
          uploadToken,
          fileName,
          data, //压缩后的buffer
          putExtra,
          function (respErr, respBody, respInfo) {
            if (respErr) {
              ctx.body = { success: true, message: "上传错误" };
              resolve();
              throw respErr;
            }
            if (respInfo.statusCode == 200) {
              ctx.body = {
                success: true,
                message: "上传成功",
                data: { file_name: respBody.key, file_href: `${process.env.CDN}/${respBody.key}` },
              };
            } else {
              ctx.status = respInfo.statusCode;
              ctx.body = { success: false, message: "上传错误" };
            }
            resolve();
          }
        );
      })
      .catch(err => {
        ctx.body = { success: false, message: "上传错误" };
        resolve();
      });
  });
});
export default router;
