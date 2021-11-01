const express = require('express');
const app = express();
const router = express.Router();
const path = require('path')
const fs = require('fs');

router.get('/news/:path', async (req, res) => {
    let news_path = req.params.path;
    let filePath = path.resolve(`public/new.json`);
    let data = fs.readFileSync(filePath).toString();
    let newsData = JSON.parse(data).data.find(item => item.path == news_path);
    res.json({
        success: !!newsData,
        message: '查询指定新闻',
        data: newsData
    })
})
module.exports = router;