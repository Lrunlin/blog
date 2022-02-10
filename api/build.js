let cmd = require("node-cmd");
let fs = require("fs");

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
    fs.access(dist, function (err) {
        if (err) {
            // 目录不存在时创建目录
            fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });

    function _copy(err, src, dist) {
        if (err) {
            callback(err);
        } else {
            fs.readdir(src, function (err, paths) {
                if (err) {
                    callback(err)
                } else {
                    paths.forEach(function (path) {
                        var _src = src + '/' + path;
                        var _dist = dist + '/' + path;
                        fs.stat(_src, function (err, stat) {
                            if (err) {
                                callback(err);
                            } else {
                                // 判断是文件还是目录
                                if (stat.isFile()) {
                                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                                } else if (stat.isDirectory()) {
                                    // 当是目录是，递归复制
                                    copyDir(_src, _dist, callback)
                                }
                            }
                        })
                    })
                }
            })
        }
    }
}

// 防止没有dist文件夹报错使用try
try {
    // 先递归清除所有文件夹中的文件然后删除所有空文件夹
    function emptyDir(filePath) {
        const files = fs.readdirSync(filePath) //读取该文件夹
        files.forEach((file) => {
            const nextFilePath = `${filePath}/${file}`
            const states = fs.statSync(nextFilePath)
            if (states.isDirectory()) {
                emptyDir(nextFilePath)
            } else {
                fs.unlinkSync(nextFilePath)
            }
        })
    }
    emptyDir('./dist')

    function deleteFolder(filePath) {
        const files = []
        if (fs.existsSync(filePath)) {
            const files = fs.readdirSync(filePath)
            files.forEach((file) => {
                const nextFilePath = `${filePath}/${file}`
                const states = fs.statSync(nextFilePath)
                if (states.isDirectory()) {
                    deleteFolder(nextFilePath)
                } else {
                    fs.unlinkSync(nextFilePath)
                }
            })
            fs.rmdirSync(filePath)
        }
    }
    deleteFolder('./dist')
} catch (error) {

}

//执行tsc和打包好的文件夹复制package和public
cmd.run(`tsc`,
    function (err, data, stderr) {
        if (err) {
            console.error('tsc 执行错误');
            console.error(err);
            return false;
        }
        fs.writeFileSync('./dist/package.json', fs.readFileSync('./package.json'));
        copyDir('./public', './dist/public')
    }
);