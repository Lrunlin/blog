// 传入：{
// router:"string",
//}
// 传出： {
//     data: string
// }
const express = require('express')
const router = express.Router();
const mysql = require('../../modules/mysql')
router.post('/delete-article-selectRouter', (req, res) => {
    const sql = `select article from article where router='${req.body.router}'`
    mysql.query(sql, function (err, result) {
        res.json({
            data: result[0].article
        })
    })
})
module.exports = router;