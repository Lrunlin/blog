const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer') //上传图片
const sharp = require("sharp")
const whiteList = require('../store/imageWriteList');

let dir = path.join(__dirname, '../public/face');


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

router.post('/user/face', upload.single('image'), async (req, res) => {
    const path = req.file.path; //图片原本的名字
    const name = `${req.userId}.webp`;

    sharp(path)
        .webp({
            quality: 50
        }).toFile(`${dir}/${name}`, (err, info) => {
            if (err) {
                res.json({
                    success: false,
                    message: '上传失败'
                });
            } else {
                res.json({
                    success: true,
                    message: '上传成功',
                    data: name
                });
            }
            fs.unlinkSync(`${dir}/${req.file.filename}`)
        })
})
module.exports = router;