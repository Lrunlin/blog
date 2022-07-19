const fs = require('fs');
const path = require('path');

// 递归删除文件夹(可以使用CMD命令，但是为了保证Mac等其他系统使用node进行删除)
function clearDir(dirpath) {
    if (!fs.existsSync(dirpath)) {
        return
    }
    let fileList = fs.readdirSync(dirpath);
    fileList.forEach(x => {
        let p = path.resolve(dirpath, x);
        let pinfo = fs.statSync(p);
        if (pinfo.isFile()) {
            fs.unlinkSync(p);
        } else if (pinfo.isDirectory()) {
            clearDir(p);
        }
    });
    fs.rmdirSync(dirpath);
}
module.exports = clearDir;