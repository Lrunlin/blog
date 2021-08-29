const express = require('express')
const app = express()


// 接收post请求
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());


app.use('/robots.txt', express.static('./file/robots.txt'));



const cors = require('cors');
app.use(cors())


const pool = require('./modules/pool')
const md5 = require('md5');
const {
    decode
} = require('js-base64');
let tokenHub = [];
app.all('*', function (req, res, next) {
    let result = false;
    const token = req.headers.authorization;
    const method = req.method.toLocaleLowerCase();
    if (token) {
        let sign; //每次请求后文件形式保存签名
        try {
            const str = JSON.parse(decode(token));
            const checkTime = Math.abs(str.time - +new Date()) < 86400000;
            const checkSign = md5('刘润霖0621' + method + str.time + str.salt) === str.sign;
            if (checkTime && checkSign) {
                // todo 时间和签名格式没问题，保存一份签名文件
                sign = str.sign;
                result = true;
            }
        } catch {
            console.log('请求错误');
        }
        // 校验重复签名
        if (sign) {
            if (tokenHub.includes(sign)) {
                result = false
            } else {
                tokenHub.push(sign)
                setTimeout(() => {
                    tokenHub.splice(1, 1)
                }, 7200000);
            }
        }
    }
    result ? next() : (res.status(500), res.end())
})




const fs = require('fs');
function fileDisplay(filePath) {
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            files.forEach(function (filename) {
                var filedir = path.join(filePath, filename);
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile();
                        var isDir = stats.isDirectory();
                        if (isFile) {
                            // console.log(filedir);
                            app.use('/', require(filedir))
                            // console.log(`成功创建${filedir}`);
                        }
                        if (isDir) {
                            fileDisplay(filedir);
                        }
                    }
                })
            });
        }
    });
}




var path = require('path');
var filePath = path.resolve('./route');
fileDisplay(filePath);


app.listen(3000, () => console.log(`博客接口运行`))