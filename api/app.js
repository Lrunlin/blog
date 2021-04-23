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





app.use('/', require('./developer/api')); // 传sql语句的接口
app.use('/', require('./developer/logn/logn-in')); //账号登录


app.use('/', require('./developer/type/create-type')); // 添加文章类型
app.use('/', require('./developer/type/read-type')); // 读取文章类型
app.use('/', require('./developer/type/delete-type')); // 删除文章类型

app.use('/', require('./developer/article/create-article')); // 添加文章
app.use('/', require('./developer/article/read-article')); // 粗略查询文章文章
app.use('/', require('./developer/article/delete-article')); //根据路由删除文章

app.use('/', require('./developer/article/delete-article-selectRouter')); // 删除文章前根据路由查询对应的HTML
app.use('/', require('./developer/article/delete-article')); // 删除文章
app.use('/', require('./developer/article/read-router')); // 修改文章之前获取文章数据根据路由查询
app.use('/', require('./developer/article/updata-article')); // 修改文章（仅更新数据）
app.use('/', require('./developer/article/updata-article-text')); // 修改文章（仅更新数据）















app.listen(3000, () => console.log("后台接口"))