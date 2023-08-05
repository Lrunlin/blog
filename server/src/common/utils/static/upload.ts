import qiniu from "qiniu";
import sharp from "sharp";
import zone from "./utils/zone";
import Mac from "./utils/Mac";
import fs from "fs";
import { v4 } from "uuid";

export const folderList = [
  { folder: "article", quality: 80, animated: true },
  { folder: "problem", quality: 80, animated: true },
  { folder: "answer", quality: 80, animated: true },
  { folder: "comment", quality: 80, animated: true },
  { folder: "advertisement", quality: 80, animated: true },
  { folder: "avatar", quality: 90, width: 80, height: 80 },
  { folder: "cover", quality: 100, width: 195, height: 130 },
  { folder: "type", quality: 70, width: 80, height: 80 },
  { folder: "friendly-link", quality: 80, width: 80, height: 80 },
];
export type FolderItemType = (typeof folderList)[number];

process.env.VIPS_DISC_THRESHOLD = "750m";
let config = new qiniu.conf.Config({
  zone: zone,
});
let options = {
  scope: process.env.OSS_NAME,
};

// https://sharp.pixelplumbing.com/api-utility#cache
sharp.cache(false); //不缓存

/**
 * 将文件上传至七牛云
 * @params buffer {Buffer} 上传图片的Buffer
 * @params option {folder:string,file_name:string,quality:number,width:number,height:number}
 * @return {file_name文件夹名称 file_href文件访问路径}
 * @return mes {string} 错误提示
 */
async function upload(
  buffer: Buffer,
  option: { folder: FolderItemType["folder"]; file_name: string }
): Promise<{ file_name: string; file_href: string } | string> {
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(Mac);
  let formUploader = new qiniu.form_up.FormUploader(config);
  let putExtra = new qiniu.form_up.PutExtra();
  // 根据folder判断sharp对应的配置
  let sharpOption = folderList.find(item => item.folder == option.folder) as FolderItemType;
  let sharpInstance = sharp(buffer, { animated: !!sharpOption.animated });
  let processed = sharpInstance.webp({ lossless: true, quality: sharpOption.quality });
  if (sharpOption.width) {
    processed = processed.resize({ width: sharpOption.width, height: sharpOption.height });
  }

  let fileName = `${v4()}.webp`;
  await processed.toFile(`public/${fileName}`); //使用toBuffer在Linux可能会有内存泄漏
  let _buffer = fs.readFileSync(`public/${fileName}`);
  try {
    fs.unlinkSync(`public/${fileName}`);
  } catch (error) {
    console.log(error);
  }

  return new Promise((resolve, reject) => {
    formUploader.put(
      uploadToken,
      `${option.folder}/${option.file_name}`,
      _buffer, //处理后的buffer
      putExtra,
      function (respErr, respBody, respInfo) {
        if (respErr) {
          reject(respErr);
          sharpInstance?.destroy();
          return;
        }
        if (respInfo.statusCode == 200) {
          resolve({
            file_name: respBody.key.replace(`${option.folder}/`, ""),
            file_href: `${process.env.CDN}/${respBody.key}`,
          });
        } else {
          reject("图片上传错误");
        }
      }
    );
  }) as Promise<string | { file_name: string; file_href: string }>;
}
export default upload;
