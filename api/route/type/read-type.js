const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.get('/type', async (req, res) => {
    let key = req.query.key ? req.query.key : "*";
    const [rows] = await pool.query(`select ${key} from articletype ORDER BY time DESC;`);
    res.json({
        success: true,
        message: '查询所有文章类型（降序）',
        data: rows
    })
})
module.exports = router;