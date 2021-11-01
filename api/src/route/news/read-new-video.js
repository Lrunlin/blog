const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');

/*
todo 返回视频消息，3个就行
*/

router.get('/video', async (req, res) => {
    axios.get('https://www.xuexi.cn/lgdata/1novbsbi47k.json').then(response => {
        res.json({
            success: true,
            data: response.data.splice(2, 3)
        })
    })
})
module.exports = router;