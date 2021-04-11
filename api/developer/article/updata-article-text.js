const express = require('express')
const router = express.Router();
const mysql = require('../../modules/mysql')
router.post('/updata-article-text', (req, res) => {
    let sql = `UPDATE article SET 
    article='${req.body.article}' 
    WHERE router='${req.body.router}';`
    console.log(sql);
    mysql.query(sql, function (err, result) {
        res.json({
            res: typeof result == "object",
            data: result
        })
    })
})
module.exports = router;