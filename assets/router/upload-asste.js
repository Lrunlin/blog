const express = require('express')
const app = express()
const router = express.Router();
const fs = require('fs');
const images = require("images"); //压缩图片
const multer = require('multer') //上传图片
const sharp = require("sharp")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temporary')
    },
    filename: function (req, file, cb) {
        cb(null, +new Date() + '.jpg')
    }
})
const upload = multer({
    storage: storage
})

router.post('/assets', upload.single('image'), async (req, res) => {
    const path = req.file.path; //图片原本的名字
    const name = req.file.filename;
    let data = ['localhost', '127.0.0.1'].find(item => req.headers.origin.includes(item)) ?
        `http://localhost:3456/temporary/${name}` : `https://assets.blogweb.cn/temporary/${name}`;
    res.json({
        errno: 0,
        data: data
    })

    //处理水印
    let size = images(path).size() //根据图片宽度动态 设置修改水印的宽度
    let watermark = `./assets/watermark${(Math.random()+'').substring(3,8)}.png`
    await sharp("./assets/logo.svg")
        .resize(size.width * 0.2)
        .png()
        .toFile(watermark)

    //获取水印宽度计算水印位置
    let sizeWatermark = images(watermark).size();
    let position = {
        top: size.width - (sizeWatermark.width + 30),
        left: size.height - (sizeWatermark.height + 30),
    }
    await images(path)
        .draw(images(watermark), position.top, position.left)
        .save(path, {
            quality: 60
        });

    fs.unlinkSync(watermark)
    setTimeout(() => {
        try {
            fs.unlinkSync(path);
        } catch {}
    }, 86400000);
})
module.exports = router;