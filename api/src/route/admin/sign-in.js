const express = require('express');
const app = express();
const router = express.Router();
const pool = require("@/modules/pool");
const md5 = require('md5');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');



router.get('/admin', async (req, res) => {
    let privateKey = fs.readFileSync(path.join(__dirname, '../../store/key/private.pem')).toString();
    let {
        admin,
        password
    } = req.query;
    let encodePassword = md5(password + '刘润霖');
    let encodeAdmin = md5(admin);

    const sql = `select COUNT(*) from admin where admin='${encodeAdmin}' and password='${encodePassword}';`
    const [data] = await pool.query(sql);
    let success = !!data[0]['COUNT(*)'];
    /*
    todo 登录成功之后再内存中保存token
    ?在特定时候检测是否登录
    */

    let token = success ? jwt.sign({
        admin: encodeAdmin,
    }, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1d',
    }) : '';


    res.json({
        success: success,
        message: success ? '登录成功' : "登录失败",
        token: token
    })
})
module.exports = router;