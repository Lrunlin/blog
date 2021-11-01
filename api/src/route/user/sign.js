const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');
let client_id = `fa17b3676791f6cfa668`;
let client_secret = `a5f52626605a399335280a3d5937cfe3d5946292`;
const jwt = require('jsonwebtoken');
const {
    PRIVETEKEY
} = require('@/store/key')
/*
todo 根据code授权码获取用户资源资源授权
documention https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
*/

router.get('/user/sign', async (req, res) => {
    axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token',
        data: {
            code: req.query.code,
            client_id: client_id,
            client_secret: client_secret
        },
        headers: {
            accept: 'application/json'
        }
    }).then(response => {
        let token = jwt.sign({
            token: response.data.access_token
        }, PRIVETEKEY, {
            algorithm: 'RS256',
            expiresIn: '365d',
        });
        // console.log(token);
        res.json({
            success: true,
            data: token
        });
    }).catch(err => {
        console.log(err);
        res.json({
            success: false
        })
    })
})
module.exports = router;