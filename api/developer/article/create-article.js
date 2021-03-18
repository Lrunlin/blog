// 传入：{
// router:"string",
// type:'string',
// introduce:'string',
// article:'string',
// isTop:Boolean,
// isShow:Boolean,
//}
// 传出： {
//     res: Boolean
// }
const express = require('express')
const router = express.Router();
const mysql = require('../../modules/mysql')
router.post('/create-article', (req, res) => {
    let test = /^[\s\S]*.*[^\s][\s\S]*$/;
    let time = new Date().getTime();
    console.log(res.boyd);
    let router = test.test(req.body.router) ? req.body.router : time.toString(32);
    const sql = `INSERT INTO article ( router, type, title , introduce,article,isTop,isShow,time)
                       VALUES
                       ('${router}', '${req.body.type}','${req.body.title}','${req.body.introduce}','${req.body.article}',${req.body.isTop},${req.body.isShow}, NOW());`
    console.log(sql);
    mysql.query(sql, function (err, result) {
        res.json({
            res: typeof result == "object"
        })
    })
})
module.exports = router;
