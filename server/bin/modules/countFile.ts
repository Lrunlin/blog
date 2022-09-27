import fs from 'fs';
import path from "path";

/** 
 * 获取文件夹内文件数量
 */
function countFile(filePath:string) {
    let fileCount = 0;
    function count(filePath:string) {
        let files = fs.readdirSync(filePath);
        for (let index = 0; index < files.length; index++) {
            let filename = files[index];
            let filedir = path.join(filePath, filename); //拼接路径用于app.use
            let stats = fs.statSync(filedir);
            let isFile = stats.isFile();
            let isDir = stats.isDirectory();
            if (isFile) {
                fileCount++
            }
            if (isDir) {
                count(filedir);
            }
        }
    }
    count(filePath)
    return fileCount;
}
export default countFile;