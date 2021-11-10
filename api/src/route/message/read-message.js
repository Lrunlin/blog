/*author:田蕤实*/
const express = require('express');
const app = express();
const router = express.Router();
const pool = require("@/modules/pool");
const decode = require('js-base64').decode
router.get('/message', global.auth, async (req, res) => {
    const [data] = await pool.query(`select * from message;`);
    data.map(item => {
        item.content = decode(item.content)
        item.contact = decode(item.contact)
        return item;
    })
    res.json({
        success: true,
        message: '查询全部留言',
        data: data
    })
})
module.exports = router;