const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const moment = require('moment');

router.get('/assets', async (req, res) => {

    const formatSize = (fileSize) => {
        let result = ''
        if (fileSize >= 1048576) {
            result = fileSize % 1048576 === 0 ? fileSize / 1048576 + 'MB' : Math.trunc(fileSize / 1048576) + 'MB'
        } else if (fileSize >= 1024) {
            result = fileSize % 1024 === 0 ? fileSize / 1024 + 'KB' : Math.trunc(fileSize / 1024) + 'KB'
        } else {
            result = fileSize + 'B'
        }
        return result;
    }


    let dirData = fs.readdirSync(`image`).filter(item => item != '.gitkeep');
    let data = dirData.map(item => {
        let fileData = fs.statSync(`image/${item}`);
        return {
            name:item,
            size: formatSize(fileData.size),
            time: moment(fileData.birthtime).format('yyyy-MM-DD hh:mm')
        }
    })
    res.json({
        success: true,
        message:'查询静态文件',
        data: data
    })
})
module.exports = router;