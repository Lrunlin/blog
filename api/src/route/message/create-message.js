const express = require('express');
const app = express();
const router = express.Router();
const encode = require('js-base64').encode;
const pool = require("@/modules/pool");
const axios = require('axios');
router.post('/message', async (req, res) => {
    let {
        content,
        contact,
    } = req.body;

    function getClientIp(req) {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    }
    address = ""
    let ip = ['localhost', '127.0.0.1'].includes(req.hostname) ? '42.249.23.230' : getClientIp(req); //判断是否内网，换ip
    await axios.get(`https://api.map.baidu.com/location/ip?ak=LC742jDXOpX0YK7zCujnaYYBUiifRHBT&ip=${ip}&coor=bd09ll`).then(res => {
        if (res.data.status == 0) {
            let {
                province,
                city
            } = res.data.content.address_detail
            address = province + city
        }
    })
    const sql = `INSERT INTO message ( id,content,contact,address,time )
                       VALUES
                       ( '${(+new Date()+''+Math.random())}', '${encode(content)}','${encode(contact)}','${address}',NOW());`
    const [data] = await pool.query(sql);
    let success = !!data.affectedRows;
    res.json({
        success: success,
        message: success ? '留言成功' : '留言失败'
    });
})
module.exports = router;