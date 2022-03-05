import nodemailer from "nodemailer";
import { User, Article } from "@/db";

let transporter = nodemailer.createTransport({
  service: "qq",
  port: 587,
  secure: false,
  auth: {
    user: "353575900@qq.com",
    pass: "mcnntrlfnjkjcaae",
  },
});
/**
 * @文章发布成功后邮箱通知用户
 * @params id {stirng|number} 文章ID
 */
async function sendEmail(id:string|number) {
  //判断文章路由有无更改
  let _article = await Article.findByPk(id);
  if (!_article) {
    return false;
  }

  let res = await User.findAll({
    attributes: ["email"],
  });

  let mailOptions = {
    from: "353575900@qq.com",
    to: res.map(item => item.email),
    subject: "文章更新",
    html: `
    <h1>您关注的文章更新啦！！！</h1>
    <h3>${_article.title}</h3>
    <div>文章类型:${_article.type}</div>
    <b>
     <a href="https://blogweb.cn/article/${_article.router}">点击链接查看吧</a>
    </b>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {});
}
export default sendEmail;
