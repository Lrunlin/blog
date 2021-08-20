const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.get('/rss/:email', async (req, res) => {
    const email = req.params.email;
    const sql = `SELECT COUNT(*) FROM rss WHERE email='${email}';`
    const [rows] = await pool.query(sql);
    res.json({
        success: !!rows[0]['COUNT(*)'],
        message: `查询用户订阅状态`,
    })
})
module.exports = router;