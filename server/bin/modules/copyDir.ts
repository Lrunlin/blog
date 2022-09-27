import fs from "fs";
// 递归复制文件夹
function copyDir(src:string, dist:string) {
    fs.access(dist, function (err) {
        if (err) {
            // 目录不存在时创建目录
            fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });

    function _copy(err:any, src:string, dist:string) {
        if (err) {
        } else {
            fs.readdir(src, function (err, paths) {
                if (err) {
                } else {
                    paths.forEach(function (path) {
                        var _src = src + '/' + path;
                        var _dist = dist + '/' + path;
                        fs.stat(_src, function (err, stat) {
                            if (err) {
                            } else {
                                // 判断是文件还是目录
                                if (stat.isFile()) {
                                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                                } else if (stat.isDirectory()) {
                                    // 当是目录是，递归复制
                                    copyDir(_src, _dist)
                                }
                            }
                        })
                    })
                }
            })
        }
    }
}
export default copyDir;