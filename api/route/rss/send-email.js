const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
const nodemailer = require('nodemailer');

router.post('/send-email', (req, res) => {
    const to = req.body.email;
    let transporter = nodemailer.createTransport({
        service: 'qq',
        // port: 465,
        // secureConnection: true,
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
        html: `您的验证码为:${code}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        console.log(1);
        if (error) {
            res.json({
                success: false,
                message: '发送验证码失败'
            })
        }
        res.json({
            success: true,
            message: '发送成功',
            data: code
        })
    });
    res.json({
        success: false
    })
})
module.exports = router;