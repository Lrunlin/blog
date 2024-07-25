import fs from "fs";

function addDir(path: string) {
  try {
    if (!fs.existsSync(`dist/${path}`)) {
      fs.mkdirSync(`dist/${path}`);
    }
  } catch (error) {
    console.error(`文件夹:${path} 添加错误`);
  }
}
export default addDir;
