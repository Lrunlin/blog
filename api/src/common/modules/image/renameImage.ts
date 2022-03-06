import fs from "fs";
import type { imageDir } from "@/types";
/**
 * 根据提供的文件夹和文件名字对文件改名
 * @params dir {string} 文件夹
 * @params oldValue {string} 旧的文件名字
 * @params newValue {string} 新文件名字
 * @return {boolean} 返回结果
 */
async function renameImage(dir: imageDir, oldValue: string, newValue: string) {
  fs.rename(`public/image/${dir}/${oldValue}.webp`, `public/image/${dir}/${newValue}.webp`, err => {
    return !err;
  });
}

export default renameImage;
