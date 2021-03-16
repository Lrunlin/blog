//  npm install --save js-base64
const express = require('express');
const app = express();
// 资源跨域
const cors = require('cors');
app.use(cors())

app.use(express.static(__dirname + '/public'))
// https://github.com/dankogai/js-base64
let mysql = require('./modules/mysql')
let createPc = require('./modules/createPc')
let createPhone = require('./modules/createPhone')
let NoFound = require('./modules/NoFound')


app.get('/*', function (req, res) {
    res.set('Content-Type', 'text/html')
    res.type('text/html')
    let isPhone = /(iphone|ipod|ipad|android)/.test(req.headers["user-agent"].toLowerCase());
    let path = req.path;
    let router = path.substr(1, path.length - 1)
    mysql.query(`select * from article where router='${router}'`, function (err, result) {
        if (result) {
            if (result.length) {
                if (!isPhone) {
                    res.send(createPc(result[0]))
                } else {
                    res.send(createPhone(result[0]))
                }
            } else {
                res.send(NoFound(result[0]))
            }
        } else {
            res.send(NoFound())
        }
    })
})







app.listen(2999, () => console.log("app.js运行"))