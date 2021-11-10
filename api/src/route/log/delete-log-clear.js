/*author:谭玉美*/
const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');

//每天检测一次删除超过30天的日志
setTimeout(() => {
    fs.readdirSync(`public/log`).forEach(item => {
        let filePath = `public/log/${item}`;
        let isOverdue = Math.abs(+new Date(item.replace('.json', '')) - (+new Date())) > 2592000000;
        if (isOverdue) fs.unlinkSync(filePath)
    })
}, 86400000);

router.delete('/log/clear', global.auth, async (req, res) => {
    fs.readdirSync(`public/log`).forEach(item => {
        fs.unlinkSync(`public/log/${item}`)
    });
    res.json({
        success: true,
        message: '清除成功'
    })
})
module.exports = router;