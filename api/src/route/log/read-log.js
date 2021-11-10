/*author:谭玉美*/

const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/log', global.auth, async (req, res) => {
    const dirPath = path.resolve(`public/log`);
    const dir = fs.readdirSync(dirPath);

    let data = dir.map((item,index) => {
        let logData = fs.readFileSync(`${dirPath}/${item}`);
        return {
            id:index,
            date: item.replace('.json', ''),
            data: JSON.parse(logData.toString()).data
        }
    });
    res.json({
        success: true,
        message: '查询全部日志',
        data: data
    });
})

module.exports = router;