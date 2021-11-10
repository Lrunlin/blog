require("module-alias/register"); //设置绝对路径
const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const app = express();

app.use('/task', express.static("./public/task")); //保存下载文章的数据
app.use('/robots.txt', express.static('public/robots.txt'));
app.use('/sitemap.xml', express.static('public/sitemap.xml'));

//是否需要登录权限添加在路由上
const auth = require('@/modules/auth.js');
global.auth = auth;




app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

global.key = "刘润霖博客设置cookie的key用于验证是否登录或者对一些信息使用MD5、ASE进行加密";


const cors = require("cors");
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
}));

const responseTime = function () {
  return function (req, res, next) {
    let _startTime = new Date() // 获取时间 t1
    let calResponseTime = function () {
      let now = new Date();
      req.time = now - _startTime;
    }
    res.once('finish', calResponseTime);
    return next();
  }
}
app.use(responseTime())



const createLog = require('@/modules/createLog');
app.use(createLog)





function fileDisplay(filePath) {
  let files = fs.readdirSync(filePath);
  files.forEach(filename => {
    let filedir = path.join(filePath, filename); //拼接路径用于app.use
    let stats = fs.statSync(filedir);
    var isFile = stats.isFile();
    let isDir = stats.isDirectory();
    if (isFile) {
      app.use('/', require(filedir));
    }
    if (isDir) {
      fileDisplay(filedir);
    }
  });
}



const filePath = path.resolve('./src/route');
fileDisplay(filePath)

const siteMap = require('@/modules/sitemap.js'); //生成网站地图

app.listen(3000, () => console.log(`run`));