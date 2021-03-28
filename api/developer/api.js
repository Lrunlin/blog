const express = require('express')
const app = express()
const router = express.Router();

const mysql = require('../modules/mysql')

router.post('/api', (req, res) => {
    mysql.query(req.body.sql, function (err, result) {
        res.json({
            res:result
        })
    })
})









module.exports = router;