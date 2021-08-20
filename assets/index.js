const express = require('express');
const app = express();
const fs = require('fs')
// 资源跨域
const cors = require('cors');
app.use(cors())
// 接收post请求
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser())


app.use('/temporary', express.static('./temporary'));
app.use('/image', express.static('./image'));



const {
    decode
} = require('js-base64');
const md5 = require('md5');
app.all('*', function (req, res, next) {
    let result = false;
    const token = req.headers.authorization;
    const method = req.method.toLocaleLowerCase();

    if (token) {
        try {
            const str = JSON.parse(decode(token));
            const checkTime = Math.abs(str.time - +new Date()) < 86400000;
            const checkSign = md5('刘润霖0621' + method + str.time + str.salt) == str.sign;
            if (checkTime && checkSign) {
                result = true;
            }
        } catch {
            console.log('请求错误');
        }
        // 校验重复签名
    }
    result ? next() : (res.status(500), res.end())
})






app.use('/', require('./router/upload-asste')); // 资源上传
app.use('/', require('./router/moveTemporaryImages')); // 文章添加移动临时文件到正式文件夹
app.use('/', require('./router/delete-assets')); // 删除文章时候删除文件




app.listen(3456, () => console.log("文件处理接口"))