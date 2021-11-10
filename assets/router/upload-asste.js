/*author:吴庆泽*/

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
    let data = process.env.ENV == 'dev' ?
        `http://localhost:3456/temporary/${name}` : `https://assets.blogweb.cn/temporary/${name}`;


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
        //位置（距离右下各30像素）
        top: size.width - (sizeWatermark.width + 30),
        left: size.height - (sizeWatermark.height + 30),
    }
    //正式处理图片（打水印，压缩）
    await images(path)
        .draw(images(watermark), position.top, position.left)
        .save(path, {
            quality: 60
        });

    res.json({
        errno: 0,
        data: data
    });

    fs.unlinkSync(watermark)//删除水印图片
    //一天后尝试直接删除图片
    setTimeout(() => {
        try {
            fs.unlinkSync(path);
        } catch {}
    }, 86400000);
})
module.exports = router;