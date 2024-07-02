import fs from "fs";
import sharp from "sharp";
import { v4 } from "uuid";
import folderList from "../folderList";
import aliOSS from "./utils/oss";

export type FolderItemType = (typeof folderList)[number];

process.env.VIPS_DISC_THRESHOLD = "750m";

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
  option: { folder: FolderItemType["folder"]; file_name: string },
): Promise<{ file_name: string; file_href: string } | string> {
  // 根据folder判断sharp对应的配置
  let sharpOption = folderList.find(
    (item) => item.folder == option.folder,
  ) as FolderItemType;
  let sharpInstance = sharp(buffer, { animated: !!sharpOption.animated });
  let processed = sharpInstance.webp({
    lossless: true,
    quality: sharpOption.quality,
  });
  if (sharpOption.width) {
    processed = processed.resize({
      width: sharpOption.width,
      height: sharpOption.height,
    });
  }

  let fileName = `${v4()}.webp`;
  await processed.toFile(`public/${fileName}`); //使用toBuffer在Linux可能会有内存泄漏
  let _buffer = fs.readFileSync(`public/${fileName}`);
  try {
    fs.unlinkSync(`public/${fileName}`);
  } catch (error) {
    console.log(error);
  }

  return new Promise(async (resolve, reject) => {
    aliOSS
      .put(`${option.folder}/${option.file_name}`, _buffer)
      .then((res) => {
        resolve({
          file_name: option.file_name.replace(`${option.folder}/`, ""),
          file_href: `${process.env.CDN}/${option.folder}/${option.file_name}`,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export default upload;
