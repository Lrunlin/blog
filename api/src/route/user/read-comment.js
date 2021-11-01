const express = require('express');
const app = express();
const router = express.Router();
const pool = require('@/modules/pool');
const {
    decode
} = require('js-base64');

router.get('/comment/page/:page', async (req, res) => {
    let page = req.params.page || 1;
    let sql = `select * from comment ORDER BY time DESC LIMIT ${(page - 1) * 10},10;`;
    let [rows] = await pool.query(sql);
    let [total] = await pool.query(`SELECT COUNT(*) FROM comment;`);

    res.json({
        success: true,
        message: `查询${page}页评论`,
        total: total[0]['COUNT(*)'],
        data: rows.map(item => {
            item.content = decode(item.content)
            return item;
        })
    })
})
module.exports = router;