const express = require('express')
const app = express()
const router = express.Router();

const mysql = require('../modules/mysql')

router.all('/api', (req, res) => {
    let sql = req.body.sql || req.query.sql;
    mysql.query(sql, function (err, result) {
        res.json({
            res: result
        })
    })
})









module.exports = router;