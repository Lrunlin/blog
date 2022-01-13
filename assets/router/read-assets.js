const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const moment = require('moment');
const path = require('path');
let dir = path.join(__dirname, '../public/image');

router.get('/assets', async (req, res) => {

    //系统读取的大小看起来方便，做转换
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
    //获取正式文件夹内所有图片
    let dirData = fs.readdirSync(dir).filter(item => item != '.gitkeep');
    let data = dirData.map(item => {
        //获取图片信息
        let fileData = fs.statSync(`${dir}/${item}`);
        // 返回格式
        return {
            name: item,
            size: formatSize(fileData.size),
            time: moment(fileData.birthtime).format('yyyy-MM-DD hh:mm')
        }
    });

    res.json({
        success: true,
        message: '查询静态文件',
        data: data
    });

})
module.exports = router;