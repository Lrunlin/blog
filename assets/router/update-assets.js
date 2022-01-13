const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer') //上传图片
const sharp = require("sharp")
const md5 = require('md5');
const auth = require('../utils/auth')

let dir = path.join(__dirname, '../public');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${dir}/temporary`)
    },
    filename: function (req, file, cb) {
        //?因为不确定新文件的格式所以还是不使用params的参数
        let whiteList = ['image/jpeg', 'image/png'];
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

router.put('/assets/:name', auth, upload.single('image'), async (req, res) => {
    const path = req.file.path; //图片原本的名字

    sharp(path)
        .jpeg({
            quality: 50
        }).toFile(`${dir}/image/${req.params.name}`, (err, info) => {
            if (err) {
                res.json({
                    success: false,
                    message: '修改失败'
                });
            } else {
                res.json({
                    success: true,
                    message: '修改成功',
                    data: req.params.name
                });
            }
            fs.unlinkSync(`${dir}/temporary/${req.file.filename}`)
        })
})
module.exports = router;