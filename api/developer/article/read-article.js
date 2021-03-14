// 传入：{
// time:"string",
// index:number,
//}
// 传出： {
//     res: Boolean
// }
const express = require('express')
const router = express.Router();
const base64 = require('base-64');
const mysql = require('../../modules/mysql')
router.post('/read-article', (req, res) => {
    let sql = `select * from article ORDER by time ${req.body.time} limit ${0+req.body.index*30}, ${req.body.index*30+30};`
    mysql.query(sql, function (err, result) {
        res.json({
            res: typeof result == "object",
            data: result
        })
    })
})
module.exports = router;