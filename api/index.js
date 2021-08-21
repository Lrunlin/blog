const express = require('express')
const app = express()


// 接收post请求
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


const fs = require('fs');

app.use('/files', express.static('files'));


const cors = require('cors');
app.use(cors())


const pool = require('./modules/pool')
const md5 = require('md5');
const {
    decode
} = require('js-base64');

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
            try {
                fs.statSync(`./session/${sign}.json`);
                result = false;
            } catch (error) {
                fs.writeFileSync(`./session/${sign}.json`, req._parsedUrl.pathname || "")
                setTimeout(() => {
                    try {
                        fs.unlinkSync(`./session/${sign}.json`)
                    } catch {}
                }, 86400000);
            }
        }

    }
    result ? next() : (res.status(500), res.end())
})




let routes = fs.readdirSync('./route')

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


app.use('/', require('./route/type/read-type'))
app.listen(3000, () => console.log(`博客接口运行`))