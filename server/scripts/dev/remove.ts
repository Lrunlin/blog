import fs from "fs";


function remove(path: string) {
  try {
    let targetPath = `dist/${path.replace(".ts", ".js")}`;
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }
  } catch (error) {
    console.error(`文件:${path} 删除错误`);

  }
}
export default remove;