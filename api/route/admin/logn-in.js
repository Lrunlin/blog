const express = require('express')
const app = express()
const router = express.Router()
const pool = require('../../modules/pool')
const md5 = require('md5');
router.post('/logn-in', async (req, res) => {
    let {
        admin,
        password
    } = req.body
    const [rows] = await pool.query(`select * from admin WHERE admin='${admin}' and password='${password}';`);
    res.json({
        success: !!rows.length,
        message: '登录',
        data: !!rows.length ? md5(`刘润霖0621${admin}刘润霖0621${password}`) : null
    })
})
module.exports = router;