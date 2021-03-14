// 传入：{
//     type:string
// }

// 传出： {
//     res: Boolean
// }

const express = require('express')
const router = express.Router();
const mysql = require('../../modules/mysql')
router.post('/delete-type', (req, res) => {
    const sql = `DELETE FROM articletype where type='${req.body.type}'`
    mysql.query(sql, function (err, result) {
        res.json({
            res: !!result,
        })
    })
})
module.exports = router;