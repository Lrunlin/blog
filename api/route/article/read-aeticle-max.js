const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.get('/article-max', async (req, res) => {
    const sql = `SELECT COUNT(*) FROM article WHERE isShow=1;`
    const [rows] = await pool.query(sql);
    res.json({
        success: true,
        message: `查询所有isShow=1的文章的总数`,
        data: rows[0]['COUNT(*)']
    })
})
module.exports = router;