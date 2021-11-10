/*author:王长增*/

const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');


// 在启动时删除所有已经下载的文件
fs.readdirSync(path.resolve(`public/task`)).forEach(item => {
    fs.unlinkSync(path.resolve(`public/task/${item}`))
})

router.delete('/spider', global.auth, async (req, res) => {
    let id = req.query.id;
    let filePath = path.resolve(`public/task/${id}.json`);
    try {
        if (global.task[id].timer) {
            clearInterval(global.task[id].timer)
        } else {
            fs.unlinkSync(filePath);
        };
        delete global.task[id];
        res.json({
            success: true,
            message: '删除成功'
        })
    } catch (error) {
        res.json({
            success: false,
            message: '删除失败'
        })
    }
})
module.exports = router;