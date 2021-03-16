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
        if (result) {
            res.json({
                res: result.length == 1,
                admin: req.body.admin,
                password: req.body.password
            })
        } else {
            res.json({
                res: false
            })
        }
    })
})
module.exports = router;