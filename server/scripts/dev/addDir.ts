import fs from "fs";

function addDir(path: string) {
  if (!fs.existsSync(`dist/${path}`)) {
    fs.mkdirSync(`dist/${path}`);
  }
}
export default addDir;
