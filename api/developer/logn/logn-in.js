// 传入：admin password
// 传出： {
//     res: Boolean
// }
const express = require('express')
const router = express.Router();
const mysql = require('../../modules/mysql')
router.post('/logn-in', (req, res) => {
    const sql = `select * from admin where admin='${req.body.admin}'  and password=${req.body.password};`
    mysql.query(sql, function (err, result) {
        res.json({
            res: result.length == 1
        })
    })
})
module.exports = router;