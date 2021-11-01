const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const {
    PUBLICKEY
} = require('@/store/key')
router.get('/user', async (req, res) => {
    let token = req.headers.token + '';
    jwt.verify(token, PUBLICKEY, function (err, decode) {
        console.log(decode);
        if (err) {
            res.json({
                success: false,
                message: '请登录'
            })
            return false;
        };
        if (req.query.verify_only) {
            res.json({
                success: true,
                message: '登录成功'
            })
            return false;
        };
        axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${decode.token}`
            }
        }).then(response => {
            let isSuccess = !!response.data.login;
            res.json({
                success: isSuccess,
                data: response.data
            })
        }).catch(err => {
            console.log(err);
            res.json({
                success: false
            })
        })






    });
})
module.exports = router;