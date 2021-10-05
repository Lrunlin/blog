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


global.key = "刘润霖博客设置cookie的key用于验证是否登录或者对一些信息使用MD5、ASE进行加密";
const jwt = require('jsonwebtoken');
app.all('*',(req, res, next) => {
    jwt.verify(req.headers.authorization, global.key, function (err, decoded) {
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