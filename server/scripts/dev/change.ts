import fs from "fs";
import compile from "../modules/compile";


function change(path: string) {
  try {
    if (path.endsWith(".ts")) {
      let targetPath = `dist/${path.replace(".ts", ".js")}`;
      fs.writeFileSync(targetPath, compile(path));
    } else {
      fs.writeFileSync(`dist/${path}`, fs.readFileSync(path));
    }
  } catch (error) {
    console.error(`文件:${path} 修改错误`);
  }
}
export default change;