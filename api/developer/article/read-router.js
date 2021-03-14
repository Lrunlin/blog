// 传入：{
// router:"string",
//}
// 传出： {
//     res: Boolean,
//     data:array
// }
const express = require('express')
const router = express.Router();
const mysql = require('../../modules/mysql')
router.post('/read-router', (req, res) => {
    let sql = `select * from article where router='${req.body.router}';`
    mysql.query(sql, function (err, result) {
        res.json({
            res: typeof result == "object",
            data: typeof result == "object" ? result[0] : ""
        })
    })
})
module.exports = router;