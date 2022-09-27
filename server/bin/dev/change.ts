import fs from "fs";
import compile from "../modules/compile";

function change(path: string) {
  let targetPath = `dist/${path.replace(".ts", ".js")}`;
  fs.writeFileSync(targetPath, compile(path));
}
export default change;
