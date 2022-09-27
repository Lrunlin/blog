import fs from "fs";
import path from "path";
import Router from "@koa/router";

let router = new Router();
async function fileDisplay(filePath: string) {
  let fileList: string[] = [];
  function _fileDisplay(filePath: string) {
    let files = fs.readdirSync(filePath);
    for (let index = 0; index < files.length; index++) {
      let filename = files[index];
      let filedir = path.join(filePath, filename); //拼接路径用于app.use
      let stats = fs.statSync(filedir);
      let isFile = stats.isFile();
      let isDir = stats.isDirectory();
      if (isFile) {
        fileList.push(filedir);
      }
      if (isDir) {
        _fileDisplay(filedir);
      }
    }
  }
  _fileDisplay(filePath);
  return fileList;
}
let src = path.join(__dirname, "../../routes");
async function getAllRouter() {
  let fileList = await fileDisplay(src);
  return fileList.filter(item => {
    return item.endsWith(".js");
  });
}
export default getAllRouter;
