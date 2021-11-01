const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const path = require('path');

let filePath = path.resolve(`public/rubbish-dump.json`);
let data = JSON.parse(fs.readFileSync(filePath)).data; //存储的文章信息
router.get('/xuexi/page/:page', async (req, res) => {
    let page = +req.params.page;
    res.json({
        success: true,
        total: data.length,
        message: `${(page - 1) * 10},${(page * 10) - 1}`,
        data: data.filter((item, index) => index >= (page - 1) * 10 && index <= (page * 10) - 1)
    })

})
module.exports = router;