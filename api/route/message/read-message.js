const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.get('/message', async (req, res) => {
    const email = req.params.email;
    const sql = `SELECT * FROM message;`
    const [rows] = await pool.query(sql);
    res.json({
        success: !!rows,
        message: `查询所有词条`,
        data:rows
    })
})
module.exports = router;