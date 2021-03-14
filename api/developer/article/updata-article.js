// 传入：{
//}
// 传出： {
//     res: Boolean
// }
const express = require('express')
const router = express.Router();
const base64 = require('base-64');
const mysql = require('../../modules/mysql')
router.post('/updata-article', (req, res) => {
    let test = /^[\s\S]*.*[^\s][\s\S]*$/;
    let time = new Date().getTime();
    let router = test.test(req.body.router) ? req.body.router : time.toString(32);

    let sql = `UPDATE article SET 
    router='${req.body.router}',
    type='${req.body.type}',
    introduce = '${req.body.introduce}',
    article='${req.body.article}',
    isTop=${req.body.isTop},
    isShow=${req.body.isShow},
    time='${req.body.time}'  WHERE router='${req.body.idrouter}';`
    mysql.query(sql, function (err, result) {
        res.json({
            res: typeof result == "object",
            data: result
        })
    })
})
module.exports = router;