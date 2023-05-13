import qiniu from "qiniu";
import sharp from "sharp";
import sync from "@/common/utils/sync";
import zone from "./utils/zone";
import Mac from "./utils/Mac";
process.env.VIPS_DISC_THRESHOLD = "750m";

let config = new qiniu.conf.Config({
  zone: zone,
});

let bucket = process.env.OSS_NAME;
// https://sharp.pixelplumbing.com/api-utility#cache
sharp.cache(false); //不缓存
/**
 * 将文件上传至七牛云
 * @params buffer {Buffer} 上传图片的Buffer
 * @params fileName {[folder,file_name]} [上传的文件夹,上传的文件名]
 * @return {file_name文件夹名称 file_href文件访问路径}
 * @return mes {string} 错误提示
 */
async function upload(
  buffer: Buffer,
  fileName: [string, string]
): Promise<{ file_name: string; file_href: string } | string> {
  let options = {
    scope: bucket,
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(Mac);
  let formUploader = new qiniu.form_up.FormUploader(config);
  let putExtra = new qiniu.form_up.PutExtra();
  const sharpInstance = sharp(buffer, { animated: true });
  const processedBuffer = await sharpInstance.webp({ lossless: true, quality: 80 }).toBuffer();
  return (await sync((resolve, reject) => {
    formUploader.put(
      uploadToken,
      fileName.join("/"),
      processedBuffer, //处理后的buffer
      putExtra,
      function (respErr, respBody, respInfo) {
        if (respErr) {
          reject(respErr);
          sharpInstance?.destroy();
          return;
        }
        if (respInfo.statusCode == 200) {
          resolve({
            file_name: respBody.key.replace(`${fileName[0]}/`, ""),
            file_href: `${process.env.CDN}/${respBody.key}`,
          });
        } else {
          reject("图片上传错误");
        }
        sharpInstance?.destroy();
      }
    );
  })) as Promise<string | { file_name: string; file_href: string }>;
}
export default upload;
