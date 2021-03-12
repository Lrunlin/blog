// 传出： {
//     data: array
// }
const express = require('express')
const router = express.Router();
const mysql = require('../../modules/mysql')
router.post('/read-type', (req, res) => {
    const sql = `select * from articletype order by time desc`
    mysql.query(sql, function (err, result) {
        res.json({
            res: !!result,
            data:result
        })
    })
})
module.exports = router;