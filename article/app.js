const express = require('express');
const app = express();
// 资源跨域
const cors = require('cors');
app.use(cors())

let createHtml = require('./modules/createHtml')

app.get('/*', function (req, res) {
    res.set('Content-Type', 'text/html')
    res.type('text/html')
    console.log(createHtml());
})







app.listen(2999, () => console.log("app.js运行"))