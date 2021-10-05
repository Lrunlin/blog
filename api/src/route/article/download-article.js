const express = require('express');
const app = express();
const router = express.Router();
const {
    decode
} = require('js-base64');
let pool = require("@/modules/pool");

router.get('/article/download', async (req, res) => {
    const [data] = await pool.query(`select * from article where isShow=1;`)
    let needDecode = ["title", "article", "introduce"];
    data.map((item) => {
        Object.keys(item).forEach(el => {
            if (needDecode.includes(el)) item[el] = decode(item[el]);
        });
        return item;
    });
    let download = {
        author: "刘润霖",
        url: 'blogweb.cn',
        length: data.length,
        time:new Date(),
        data: data
    }
    res.json({
        success: true,
        message: "下载文章",
        data: JSON.stringify(download)
    })
})
module.exports = router;