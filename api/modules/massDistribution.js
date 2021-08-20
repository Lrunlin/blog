const pool = require('./pool');
const nodemailer = require('nodemailer');
module.exports = async function massDistribution(option) {
    let {
        router,
        title,
        introduce
    } = option;
    const [rows] = await pool.query(`select email from rss;`);
    const data = rows.map(item => item.email).join(',');
    let transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465,
        secureConnection: true,
        auth: {
            user: '353575900@qq.com',
            pass: 'oqnzwtoxzffocaca',
        }
    });
    const code = (Math.random() + '').substring(3, 7)
    let mailOptions = {
        from: '353575900@qq.com',
        to: data,
        subject: 'WEB博客更新',
        html: `
        <h2>您订阅的WEB博客更新了</h2>
        <div>${title}</div>
        <div>${introduce}</div>
<a href = "https://blogweb.cn/article/${router}"> 点击此处 </a>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {

    });
}