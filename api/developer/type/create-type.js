// 传入：type：'文章类型'
// 传出： {
//     res: Boolean
// }
const express = require('express')
const router = express.Router();
const mysql = require('../../modules/mysql')
router.post('/create-type', (req, res) => {
    const sql = `INSERT INTO articletype ( type, time )
                       VALUES
                       ( '${req.body.type}', NOW());`
    mysql.query(sql, function (err, result) {
        res.json({
            res: typeof result == "object"
        })
    })
})
module.exports = router;