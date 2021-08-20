const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.post('/rss', async (req, res) => {
    const email = req.body.email;
    const sql = `INSERT INTO rss ( email, time )
                       VALUES
                       ('${email}',NOW());`
    const [rows] = await pool.query(sql);
    res.json({
        success: !!rows.affectedRows,
        message: `创建用户订阅`,
    })
})
module.exports = router;