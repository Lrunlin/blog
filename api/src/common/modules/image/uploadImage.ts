import type { Request } from "express";
import sharp from "sharp";
import fs from "fs";
import { v4 } from "uuid";
import type { imageDir } from "@/types";
interface optionType {
  dir: imageDir;
  name?: string;
}
/**
 * 将upload上传的图片以webp格式保存到指定位置（配合upload）
 * @params req {Request}
 * @params option {dir:string,name:string}|false 传入的文件夹和文件名(传入false删除图片)
 * @return {Promise<string|boolean>} 返回结果
 */
async function uploadImage(req: Request, option: optionType | false) {
  let id = v4().replace(/-/g, "");
  if (req.file) {
    let filename = req.file.filename;
    if (!option) {
      fs.unlinkSync(`public/image/${filename}`);
      return false;
    }

    return await sharp(`public/image/${filename}`)
      .webp({
        quality: 50,
      })
      .toFile(`public/image/${option.dir}/${option.name || id}.webp`)
      .then(info => {
        return option.name || id;
      })
      .catch(err => {
        return false;
      })
      .finally(() => {
        fs.unlinkSync(`public/image/${filename}`);
      });
  } else {
    return false;
  }
}

export default uploadImage;
