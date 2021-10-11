const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const pool = require('@/modules/pool')
const {
    decode
} = require('js-base64');


async function rssEmail(articleData) {
    const {
        introduce,
        type,
        router,
        title
    } = articleData;

    let [data] = await pool.query('select email from rss;');
    let rssData = data.map(item => decode(item.email)).join(',');

    let transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465,
        secureConnection: true,
        auth: {
            user: '353575900@qq.com',
            pass: 'mcnntrlfnjkjcaae',
        }
    });
    let mailOptions = {
        from: '353575900@qq.com',
        to: rssData,
        subject: '文章更新',
        html: `
        <h1>你给订阅的文章更新了</h1>
        <h2>${title}</h2>
        <p>文章是对${type}等问题进行讲解</p>
        <p>${introduce}</p>
        <a href="https://blogweb.cn/article/${router}"><b style="color:red;">查看文章</b></a>
        <div>本站首页:<a href="https://blogweb.cn">博客首页</a></div>
        `
    };
    transporter.sendMail(mailOptions, (error, info) => {});
};


module.exports = rssEmail;