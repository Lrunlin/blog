const express = require('express')
const app = express()


// 接收post请求
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
const cors = require('cors');
app.use(cors())






let pool = require('./modules/pool')

// app.all('*', function (req, res, next) {
// req.query.a=2
//     next()
// })




const fs = require('fs')
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


app.use('/',require('./route/type/read-type'))
app.listen(3000, () => console.log(`博客接口运行`))