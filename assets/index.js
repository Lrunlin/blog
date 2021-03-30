const express = require('express');
const app = express();
// 资源跨域
const cors = require('cors');
app.use(cors())
// 接收post请求
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// 文件上传包
const fileUpload = require('express-fileupload');
app.use(fileUpload());


const {
    Base64
} = require('js-base64');
app.all('*', function (req, res, next) {
    let isHeader = Math.abs(+Base64.decode(req.headers.liurunlin) - new Date().getTime()) < 86400000
    if (req.headers.liurunlin && isHeader) {
        next();
    } else {
        res.status(503)
    }
})





app.use('/', require('./router/upload-asste')); // 资源上传
app.use('/', require('./router/moveTemporaryImages')); // 文章添加移动临时文件到正式文件夹
app.use('/', require('./router/delete-assets')); // 删除文章时候删除文件




app.listen(3456, () => console.log("文件处理接口"))