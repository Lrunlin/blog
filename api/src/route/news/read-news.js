const express = require('express');
const app = express();
const router = express.Router();
const path = require('path')
const fs = require('fs');

router.get('/news', async (req, res) => {
    let filePath = path.resolve(`public/new.json`);
    let data = fs.readFileSync(filePath).toString();
    res.json({
        success: true,
        message: '查询全部新闻',
        data: JSON.parse(data).data
    })
})
module.exports = router;