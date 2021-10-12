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

let publicKey = fs.readFileSync('./assets/public.pem').toString();//公钥

app.use('/temporary', express.static('./temporary'));
app.use('/image', express.static('./image'));
app.use('/robots.txt', express.static('./assets/robots.txt'));


const jwt = require('jsonwebtoken');
app.all('*',(req, res, next) => {
    jwt.verify(req.headers.authorization, publicKey, function (err, decoded) {
        if (decoded) {
            next()
        } else {
            res.status(401);
            res.end();
        };
    });
})




app.use('/', require('./router/upload-asste')); // 资源上传
app.use('/', require('./router/moveTemporaryImages')); // 文章添加移动临时文件到正式文件夹
app.use('/', require('./router/delete-assets')); // 删除文章时候删除文件
app.use('/', require('./router/read-assets')); // 查询资源




app.listen(3456, () => console.log("文件处理接口"))