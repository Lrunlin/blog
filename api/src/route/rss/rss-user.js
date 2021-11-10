/*author:丁光禹*/
const express = require('express');
const app = express();
const router = express.Router();
const md5 = require('md5');
const fs = require('fs');
const path = require('path');
const {
    encode,
    decode
} = require('js-base64');
let {
    hasRssEmail
} = require('@/store/rssEmail');
let pool = require('@/modules/pool')


router.get('/rss-user', async (req, res) => {
    let _html = fs.readFileSync(path.join(__dirname, '../../views/rss.html')).toString();
    let _css = fs.readFileSync(path.join(__dirname, '../../views/css/index.css')).toString();

    function template(key, value) {
        _html = _html.replace(new RegExp(`<%${key}%>`, 'g'), value)
    };
    template('style', _css);
    let {
        email,
        token,
        mode
    } = req.query;
    let test = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //!先判断邮箱是否格式有误，为了防止base64解码错误使用try...catch...
    try {
        if (test.test(decode(email))) {
            email = decode(email);
        } else {
            template('state', 'error')
            template('message', '你的邮箱格式错误')
            res.send(_html);
            return false;
        }
    } catch (error) {
        template('state', 'error')
        template('message', '请不要随意修改地址栏地址')
        res.send(_html);
        return false;
    };
    let createRss = `INSERT INTO rss ( email, time )
                       VALUES
            ('${encode(email)}', NOW());
            `;
    let deleteRss = `DELETE FROM rss WHERE email='${encode(email)}';`;


    //?验证token是否有误
    if (!hasRssEmail(encode(email), mode, token)) {
        template('state', 'error')
        template('message', '你的地址已失效可能是你的等待时间超过了30分钟，或者是您已经点击过此链接，请返回至订阅页面查看')
        res.send(_html);
        return false;
    };

    let [data] = await pool.query(mode == 'delete' ? deleteRss : createRss)

    //todo 通过token邮箱没问题进行数据库操作
    if (!!data.affectedRows) {
        //成功
        template('state', 'success')
        template('message', `${mode=='delete'?'取消订阅':'订阅'}成功`)
        res.send(_html);
    } else {
        template('state', 'error')
        template('message', `数据库发生未知错误，这并不是您的操作有误，您可以返回订阅页面重复此操作`)
        res.send(_html);
    }
});
module.exports = router;