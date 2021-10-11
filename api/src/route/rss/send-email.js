const express = require('express')
const app = express()
const router = express.Router()
const nodemailer = require('nodemailer');
const md5 = require('md5');
let pool = require('@/modules/pool');
let {
    setRssEmail
} = require('@/store/rssEmail');
const {
    encode,
    decode
} = require('js-base64');

router.post('/send-email', async (req, res) => {
    const to = req.body.email;

    let test = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!test.test(to)) {
        res.json({
            success: false,
            message: '您的邮箱格式不正确'
        })
        return false;
    }



    const sql = `SELECT email FROM rss WHERE email='${encode(to)}';`;
    let [data] = await pool.query(sql);

    let transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465,
        secureConnection: true,
        auth: {
            user: '353575900@qq.com',
            pass: 'mcnntrlfnjkjcaae',
        }
    });
    let mode = data.length ? 'delete' : 'post';
    let salt = md5(Math.random() + '' + new Date());
    let token = md5(to + mode + salt);
    let query = `?email=${encode(to)}&mode=${mode}&token=${token}`;
    let href = ['localhost', '127.0.0.1'].includes(req.hostname) ?
        `http://localhost:3000` :
        `https://blog-api.blogweb.cn`;

    let mailOptions = {
        from: '353575900@qq.com',
        to: to,
        subject: '博客订阅处理',
        html: `
        <div>准备在博客网站${data.length?'取消订阅':'订阅'}文章</div>
        <div>如果是您本人操作请点击链接${data.length?'取消订阅':'订阅'}</div>
        <div>
        <a href="${href}/rss-user${query}">${data.length?'取消订阅':'订阅'}</a>
        </div>
        <div>如果您并没有执行该操作经忽略本邮件</div>
        <div>本站首页:<a href="https://blogweb.cn">博客首页</a></div>
        `
    };
    if (to) {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.json({
                    success: false,
                    message: '发送验证码失败'
                })
                return false;
            };
            res.cookie('throttle', to, {
                httpOnly: false,
                secure: true,
                path: '/',
                maxAge: 60000,
            })
            res.json({
                success: true,
                message: '发送成功',
            })
            setRssEmail(encode(to), salt);
        });
    } else {
        res.json({
            success: true,
            message: '请输入邮箱'
        })
    };
})

module.exports = router;