import fs from "fs";
import type { imageDir } from "@/types";
/**
 * 根据提供的文件夹和文件名字删除图片
 * @params dir {string} 文件夹
 * @params name {string} 文件名字
 * @return {boolean} 返回结果
 */
async function deleteImage(dir: imageDir, name: string) {
  fs.unlink(`public/image/${dir}/${name}.webp`, err => {
    return !err;
  });
}

export default deleteImage;
