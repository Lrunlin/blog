import fs from "fs";
import compile from "../modules/compile";

function add(path: string) {
  let targetPath = `dist/${path.replace(".ts", ".js")}`;
  if (!fs.existsSync(targetPath)) {
    fs.writeFileSync(targetPath, compile(path));
  }
}
export default add;
