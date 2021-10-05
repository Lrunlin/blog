const express = require('express')
const app = express()
const router = express.Router()
let pool = require('@/modules/pool')
let testEmailToken = require('@/modules/testEmailToken')
const encode = require('js-base64').encode;

router.delete('/rss/:email', async (req, res) => {
    const email = req.params.email;
    const sql = `DELETE FROM rss WHERE email='${encode(email)}';`
    let testToken = testEmailToken(req.cookies, email,req.query.code);
    if (testToken.success) {
        const [rows] = await pool.query(sql);
        res.json({
            success: !!rows.affectedRows,
            message: `取消用户的订阅`,
        })
    }else{
        res.json(testToken)
    }

})
module.exports = router;