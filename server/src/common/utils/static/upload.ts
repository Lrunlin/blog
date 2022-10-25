import qiniu from "qiniu";
import sharp from "sharp";
import sync from "@/common/utils/sync";

let config = new qiniu.conf.Config({
  zone: qiniu.zone.Zone_z2,
});
let accessKey = process.env.QINIU_AK;
let secretKey = process.env.QINIU_SK;
let bucket = process.env.OSS_NAME;

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
  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  let options = {
    scope: bucket,
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(mac);
  let formUploader = new qiniu.form_up.FormUploader(config);
  let putExtra = new qiniu.form_up.PutExtra();
  let type = fileName[1].split(".").slice(-1)[0] as "webp" | "gif";

  return (await sync((resolve, reject) => {
    sharp(buffer, { animated: true })
      [type]()
      .toBuffer()
      .then(data => {
        formUploader.put(
          uploadToken,
          fileName.join("/"),
          data, //处理后的buffer
          putExtra,
          function (respErr, respBody, respInfo) {
            if (respErr) {
              reject(respErr);
              return;
            }
            console.log(respInfo);
            if (respInfo.statusCode == 200) {
              resolve({
                file_name: respBody.key.replace(`${fileName[0]}/`, ""),
                file_href: `${process.env.CDN}/${respBody.key}`,
              });
            } else {
              reject("图片上传错误");
            }
          }
        );
      })
      .catch(err => {
        reject("图片压缩错误");
      });
  })) as Promise<string | { file_name: string; file_href: string }>;
}
export default upload;
