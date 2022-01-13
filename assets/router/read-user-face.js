const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const dir = path.join(__dirname, '../public/face');
const fs = require('fs');


router.get('/user/face', async (req, res) => {
    fs.exists(`${dir}/${req.userId}.webp`, function (exists) {
        res.json({
            success: exists,
            message: exists ? '用户没有上传过头像' : '获取头像成功',
            data: `${req.userId}.webp`
        })
    })
})
module.exports = router;