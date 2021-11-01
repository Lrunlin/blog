const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');
const pool = require('@/modules/pool');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {
    PUBLICKEY
} = require('@/store/key');
const {
    encode
} = require('js-base64');

router.post('/comment', async (req, res) => {
    try {


        let content = req.body.content;
        if ((content.length + '') > 210) {
            res.json({
                success: false,
                message: '长度超出规定范围（你要是真不方式发出请求我也没办法）'
            })
            return false;
        };

        if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(content)) {
            res.json({
                success: false,
                message: '请输入内容(正常在网页用)'
            })
            return false;
        };

        let token = req.headers.token;
        let tokenData = jwt.verify(token, PUBLICKEY)

        let userData = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${tokenData.token}`
            }
        });

        let isSuccess = !!userData.data.login;
        if (!isSuccess) {
            res.json({
                success: isSuccess,
                message: '您的Token不正确'
            })
            return false;
        };
        console.log(userData.data);
        let sql = `INSERT INTO comment ( id,token,face,name,content,time )
                       VALUES
                       ('${md5(userData.data.id+content)}', '${tokenData.token}', '${userData.data.avatar_url}', '${userData.data.login}', '${encode(content)}', NOW());
                   `;

        let [rows] = await pool.query(sql);
        if (!!rows.affectedRows) {
            res.json({
                success: !!rows.affectedRows,
                message: '评论成功'
            });
            return false;
        };
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: '评论失败'
        })
    }
})
module.exports = router;