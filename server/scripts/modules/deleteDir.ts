import fs from "fs/promises";
import path from "path";

async function directoryExists(dirPath: string): Promise<boolean> {
  try {
    await fs.access(dirPath);
    return true;
  } catch {
    return false;
  }
}

/** 递归删除文件夹 */
async function deleteDir(dirpath: string): Promise<void> {
  try {
    // 检查目录是否存在
    if (!(await directoryExists(dirpath))) {
      return;
    }

    const fileList = await fs.readdir(dirpath);
    await Promise.all(
      fileList.map(async file => {
        const filePath = path.resolve(dirpath, file);
        const fileInfo = await fs.stat(filePath);
        if (fileInfo.isFile()) {
          await fs.unlink(filePath);
        } else if (fileInfo.isDirectory()) {
          await deleteDir(filePath);
        }
      })
    );

    await fs.rmdir(dirpath);
  } catch (err) {
    console.error(`Error deleting directory ${dirpath}:`, err);
  }
}

export default deleteDir;
