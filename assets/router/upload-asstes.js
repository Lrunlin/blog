const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer') //上传图片
const sharp = require("sharp")
const md5 = require('md5');
const whiteList = require('../store/imageWriteList');

let dir = path.join(__dirname, '../public/image');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        if (whiteList.includes(file.mimetype)) {
            cb(null, `${+new Date()}-${file.originalname}`);
        } else {
            cb(null, false);
        }
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024, //限制文件大小3MB
        files: 1
    }
})

router.post('/assets', upload.single('image'), async (req, res) => {
    const path = req.file.path; //图片原本的名字
    const name = `${md5(req.file.filename+(+new Date()))}.webp`
    let data = process.env.ENV == 'dev' ?
        `http://localhost:3456/image/${name}` : `https://assets.blogweb.cn/image/${name}`;

    sharp(path)
        .webp({
            quality: 50
        })
        .toFile(`${dir}/${name}`)
        .then(info => {
            res.json({
                errno: 0,
                data: data
            });
        }).catch(err => {
            res.json({
                errno: '错误，反正不是0',
                data: data
            });
        }).finally(() => {
            fs.unlinkSync(`${dir}/${req.file.filename}`)
        })

})
module.exports = router;