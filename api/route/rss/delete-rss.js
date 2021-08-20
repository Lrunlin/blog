const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.delete('/rss/:email', async (req, res) => {
    const email = req.params.email;
    const sql = `DELETE FROM rss WHERE email='${email}';`
    const [rows] = await pool.query(sql);
    res.json({
        success: !!rows.affectedRows,
        message: `取消用户的订阅`,
    })
})
module.exports = router;