const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.post('/logn-in', async (req, res) => {
    let {
        admin,
        password
    } = req.body
    const [rows] = await pool.query(`select * from admin WHERE admin='${admin}' and password='${password}';`);
    res.json({
        success: !!rows.length,
        message: '登录',
    })
})
module.exports = router;