const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer') //上传图片
const sharp = require("sharp")
const md5 = require('md5');
const axios = require('axios');
const adminAuth = require('../utils/auth');
let dir = path.join(__dirname, '../public/github');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir)
    },
    filename: function (req, file, cb) {
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
        fileSize: 5 * 1024 * 1024, //限制文件大小3MB
        files: 1
    }
})


router.post('/assets/github', adminAuth, upload.single('image'), async (req, res) => {
    const path = req.file.path; //图片原本的名字

    // 判断请求头，是否用户头像生成对应的文件名
    const name = `${md5(req.file.filename+(+new Date()))}.jpg`;
    let data = process.env.ENV == 'dev' ?
        `http://localhost:3456/github/${name}` : `https://assets.blogweb.cn/github/${name}`;

    sharp(path)
        .jpeg({
            quality: 50
        }).toFile(`${dir}/${name}`, (err, info) => {
            if (err) {
                res.json({
                    success: false,
                });
            } else {
                res.json({
                    success: true,
                    message: '添加成功',
                    data: data
                });
            }
            fs.unlinkSync(`${dir}/${req.file.filename}`)
        })
})


/** 
 * todo 查询GitHub仓库信息，并查找出未使用的图片删掉
 */

setTimeout(() => {
    let url = process.env.ENV == 'dev' ?
        `http://localhost:3000` : `https://blog-api.blogweb.cn`;
    axios.get(`${url}/github`).then(res => {
        let assetsPath = process.env.ENV === "pro" ? "https://assets.blogweb.cn" : "http://localhost:3456"
        let _data = res.data.data.map(item => item.image.replace(`${assetsPath}/github/`, ''))
        console.log(_data);
        let assetsDir = fs.readdirSync(dir)
        assetsDir.forEach(item => {
            if (!_data.includes(item)) fs.unlinkSync(`${dir}/${item}`);
        })
    })
}, 604800000);
module.exports = router;