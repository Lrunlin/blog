const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/spider', global.auth, async (req, res) => {
    let dirPath = path.resolve('public/task');
    let files = fs.readdirSync(dirPath)
    let data = []
    for (const key in global.task) {
        let item = global.task[key];
        data.push({
            id: key,
            option: item.message,
            total: item.total,
            current: item.current,
            finish: !item.timer,
            download: !item.timer ? `task/${key}.json` : false
        })
    }
    res.json({
        success: true,
        messahe: '查询正在进行中的任务',
        data: data,
    })
})
module.exports = router;