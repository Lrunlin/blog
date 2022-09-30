import fs from "fs";
function remove(path: string) {
  let targetPath = `dist/${path.replace(".ts", ".js")}`;
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }
}
export default remove;
