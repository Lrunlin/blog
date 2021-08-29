const express = require('express');
const app = express();
const fs = require('fs')
// 资源跨域
const cors = require('cors');
app.use(cors())
// 接收post请求
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use(cookieParser())


app.use('/temporary', express.static('./temporary'));
app.use('/image', express.static('./image'));
app.use('/robots.txt', express.static('./assets/robots.txt'));




const {
    decode
} = require('js-base64');
const md5 = require('md5');

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






app.use('/', require('./router/upload-asste')); // 资源上传
app.use('/', require('./router/moveTemporaryImages')); // 文章添加移动临时文件到正式文件夹
app.use('/', require('./router/delete-assets')); // 删除文章时候删除文件




app.listen(3456, () => console.log("文件处理接口"))