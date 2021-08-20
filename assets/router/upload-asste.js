const express = require('express')
const app = express()
const router = express.Router();
const fs = require('fs');
const images = require("images"); //压缩图片
const multer = require('multer') //上传图片
const sizeOf = require('image-size'); //获取图片宽高
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temporary')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})

router.post('/upload-assets', upload.single('image'), (req, res) => {
    const imageName = req.file.originalname; //图片原本的名字
    let returnName = +new Date() + '.jpg' //返回的名字
    let data = req.hostname == "localhost" ? `http://localhost:3456/temporary/${returnName}` : `https://assets.blogweb.cn/temporary/${returnName}`
    res.json({
        "errno": 0,
        "data": [data]
    })
    const imageData = sizeOf(`./temporary/${imageName}`); //获取图片宽高，主要用于打水印时计算位置
    //水印宽235高84
    images(`./temporary/${imageName}`)
        .draw(images("./assets/logo.png"), imageData.width - (235 + 30), imageData.height - (84 + 30))//两边留出30像素的位置
        .save(`./temporary/${returnName}`, {
            quality: 60
        });
    fs.unlinkSync(`./temporary/${imageName}`) //删除原照片
    setTimeout(() => {
        try {
            fs.unlinkSync(`./temporary/${returnName}`);
        } catch {}
    }, 3600000);
})
module.exports = router;