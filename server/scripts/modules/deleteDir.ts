import fs from "fs";
import path from "path";

// (可以使用CMD命令，但是为了保证其他系统使用node进行删除)
/** 递归删除文件夹*/
function deleteDir(dirpath: string) {
  if (!fs.existsSync(dirpath)) {
    return;
  }
  let fileList = fs.readdirSync(dirpath);
  fileList.forEach(x => {
    let p = path.resolve(dirpath, x);
    let pinfo = fs.statSync(p);
    if (pinfo.isFile()) {
      fs.unlinkSync(p);
    } else if (pinfo.isDirectory()) {
      deleteDir(p);
    }
  });
  fs.rmdirSync(dirpath);
}
export default deleteDir;
