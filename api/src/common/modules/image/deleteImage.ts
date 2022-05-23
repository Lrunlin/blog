import fs from "fs";
import type { imageDir } from "@/types";
import { getPublicImage } from "@/store/assetsPath";

/**
 * 根据提供的文件夹和文件名字删除图片
 * @params dir {string} 文件夹
 * @params name {string} 文件名字(全名)
 * @return {boolean} 返回结果
 */
function deleteImage(dir: imageDir, name: string) {
  let result = true;
  try {
    fs.unlinkSync(getPublicImage(dir, name));
  } catch (error) {
    result = false;
  }
  return result;
}

export default deleteImage;
