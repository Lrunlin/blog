// 传入：{
// router:"string",
//}
// 传出： {
//     res:Boolean
// }
const express = require('express')
const router = express.Router();
const mysql = require('../../modules/mysql')
router.post('/delete-article', (req, res) => {
    const sql = `DELETE FROM article WHERE router='${req.body.router}'; `
    mysql.query(sql, function (err, result) {
        res.json({
            res: !!result
        })
    })
})
module.exports = router;