const express = require('express')
const app = express()
let router = express.Router();
let fs = require('fs');
let images = require("images");
router.post('/uploadAsset', (req, res) => {
    let name = Object.keys(req.files)[0] //传来的文件名字
    let type = name.split('.')[name.split('.').length - 1] //后缀
    let fileName = new Date().getTime().toString(32) + '.' + type; //存成这个名字
    let path = `./temporary/${fileName}`;
    let writerStream = fs.createWriteStream(path);
    writerStream.write(req.files[name].data, 'UTF8');
    writerStream.end();
    writerStream.on('finish', function (err) {
        let development = req.hostname == "localhost"; //环境判断(开发);
        let data = development ? `http://127.0.0.1:5500/assets/temporary/${fileName}` : `https://liurl.xyz/assets/temporary/${fileName}`
        res.json({
            "errno": 0,
            "data": [data]
        })
        // 压缩
        images(`./temporary/${fileName}`)
            // .draw(images("./assets/img-logo.jpg"), 10, 10) 水印
            .save(`./temporary/${fileName}`, {
                quality: 50
            });
    });
})
module.exports = router;