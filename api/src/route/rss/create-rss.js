const express = require('express')
const app = express()
const router = express.Router()
const encode = require('js-base64').encode;
const d5 = require('md5');
let pool = require('@/modules/pool')

router.post('/rss', async (req, res) => {
    // const email = req.body.email;
    // const sql = `INSERT INTO rss ( email, time )
    //                    VALUES
    //                    ('${encode(email)}',NOW());`
    // let testToken = testEmailToken(req.cookies, email,req.body.code);

    // if (testToken.success) {
    //     try {
    //         const [rows] = await pool.query(sql);
    //         res.json({
    //             success: !!rows.affectedRows,
    //             message: `订阅成功`,
    //         })
    //     } catch (error) {
    //         res.json({
    //             success: false,
    //             message: `创建失败`,
    //         })
    //     }

    // } else {
    //     res.json(testToken)
    // }

})
module.exports = router;