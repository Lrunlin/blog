const express = require('express')
const app = express()
const router = express.Router()
const nodemailer = require('nodemailer');
const md5 = require('md5');

router.post('/send-email', (req, res) => {
    const to = req.body.email;

    let transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465,
        secureConnection: true,
        auth: {
            user: '353575900@qq.com',
            pass: 'mcnntrlfnjkjcaae',
        }
    });
    const code = (Math.random() + '').substring(3, 7);
    let mailOptions = {
        from: '353575900@qq.com',
        to: to,
        subject: '验证码',
        html: `
        <div>您的验证码为:${code}</div>
        <div>您正在订阅文章信息</div>
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
            }
            res.cookie('email', md5(to+code + global.key), {
                httpOnly: true,
                secure: true,
                path: '/',
                maxAge: 1 * 86400000,
            })
            res.json({
                success: true,
                message: '发送成功',
                data: code
            })
        });
    } else {
        res.json({
            success: true,
            message: '请输入邮箱'
        })
    }
})
module.exports = router;