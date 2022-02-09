const express = require('express');
const app = express();
const fs = require('fs')
// 资源跨域
const cors = require('cors');
app.use(cors())
// 接收post请求
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

let publicKey = fs.readFileSync('./assets/public.pem').toString(); //公钥


const jwt = require('jsonwebtoken');
app.use('/', express.static('public'));



app.all('*', (req, res, next) => {
    jwt.verify(req.headers.authorization, publicKey, function (err, decoded) {
        if (decoded) {
            req.userId = decoded.userId;
            next()
        } else {
            res.status(401);
            res.end();
        };
    });
})




app.use('/', require('./router/upload-asstes')); // 资源上传
app.use('/', require('./router/delete-assets')); // 删除文章时候删除文件
app.use('/', require('./router/read-assets')); // 查询资源
app.use('/', require('./router/upload-github')); // 上传GitHub图片
app.use('/', require('./router/update-assets')); // 更新资源图片
app.use('/', require('./router/upload-face')); // 用户上传头像
app.use('/', require('./router/read-user-face')); // 获取用户头像




app.listen(3456, () => console.log("文件处理接口"))