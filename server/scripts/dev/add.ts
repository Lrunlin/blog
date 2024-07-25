import fs from "fs";
import compile from "../modules/compile";

function add(path: string) {
  try {
    if (path.endsWith(".ts")) {
      let targetPath = `dist/${path.replace(".ts", ".js")}`;
      if (!fs.existsSync(targetPath)) {
        fs.writeFileSync(targetPath, compile(path));
      }
    } else {
      if (!fs.existsSync(`dist/${path}`)) {
        fs.writeFileSync(`dist/${path}`, fs.readFileSync(path));
      }
    }
  } catch (error) {
    console.error(`文件:${path} 添加错误`);
  }
}
export default add;
