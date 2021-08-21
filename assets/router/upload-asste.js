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
    let data = req.hostname == "localhost" ? `http://localhost:3456/temporary/${returnName}` : `https://assets.blogweb.cn/temporary/${returnName}`;
    res.json({
        "errno": 0,
        "data": data
    })

    const imageData = images(`./temporary/${imageName}`).size(); //获取图片宽高

    //修改水印宽度
    images(`./assets/logo.png`)
        .size((imageData.width / 5))
        .save(`./assets/logo.png`);

    // 水印大小
    const logoData = {
        width: imageData.width / 5, //235
        height: (imageData.width / 5) / 235 * 80 //80
    }
    //打印位置
    const drawData = {
        left: imageData.width - logoData.width - (imageData.width * 0.05),
        top: imageData.height - logoData.height - (imageData.height * 0.05),
        // 上下空余的位置5%的位置
    }

    images(`./temporary/${imageName}`)
        .draw(images("./assets/logo.png"), drawData.left, drawData.top)
        .save(`./temporary/${returnName}`, {
            quality: 60
        });

    fs.unlinkSync(`./temporary/${imageName}`) //删除原照片
    setTimeout(() => {
        try {
            fs.unlinkSync(`./temporary/${returnName}`);
        } catch {}
    }, 86400000);
})
module.exports = router;