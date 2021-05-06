const express = require('express')
const router = express.Router();
const mysql = require('../../modules/mysql')
const axops = require('axios');
const {
    default: axios
} = require('axios');
router.post('/github-logn-in', (req, res) => {
    const code = req.body.code;
    let getToken = axios({
        method: "POST",
        url: "https://github.com/login/oauth/access_token?" +
            `client_id=fa17b3676791f6cfa668&` +
            `client_secret=f30eca863cc4efdecd374b73bce18dec60e3852e&` +
            `code=${code}`,
        headers: {
            accept: "application/json",
        },
        timeout: 5000,
        // 设置请求超时时间
    }).catch(code => {
        res.json({
            result: false
        })
    });

    getToken.then(data => {
        const accessToken = data.data.access_token;
        axios({
            method: 'get',
            url: `https://api.github.com/user`,
            timeout: 5000,
            headers: {
                accept: 'application/json',
                Authorization: `token ${accessToken}`
            }
        }).then(response => {
            res.json({
                result: true,
                data: response.data
            })
        }).catch(code => {
            res.json({
                result: false
            })
        });
    });
})
module.exports = router;