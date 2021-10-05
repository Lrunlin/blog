const express = require('express');
const app = express();
const router = express.Router();
const pool = require("@/modules/pool");
const md5 = require('md5');

const jwt = require('jsonwebtoken')


router.get('/admin', async (req, res) => {
    let {
        admin,
        password
    } = req.query;
    let encodePassword = md5(password + '刘润霖')
    const sql = `select COUNT(*) from admin where admin='${admin}' and password='${encodePassword}';`
    const [data] = await pool.query(sql);
    let success = !!data[0]['COUNT(*)'];
    /*
    todo 登录成功之后再内存中保存token
    ?在特定时候检测是否登录
    */
   const key=`
   
   `
    let token = success ? jwt.sign({
        sign: true,
    }, global.key, {
        expiresIn: '1d',
    }) : '';


    res.json({
        success: success,
        message: success ? '登录成功' : "登录失败",
        token: token
    })
})
module.exports = router;