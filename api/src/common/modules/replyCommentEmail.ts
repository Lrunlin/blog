import nodemailer from "nodemailer";
import { Comment } from "@/db";
import moment from "moment";

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
 * @用户发布评论时如果是回复那就发送邮件提醒
 * @params new_comment_id {string} 新评论的ID
 */
async function sendEmail(new_comment_id: string) {
  /** 查询评论是否有上级评论是否需要发送提醒邮件*/
  let newCommentData = await Comment.findByPk(new_comment_id);

  //如果不是回复别人的评论就不在继续实行
  if (!newCommentData?.superior) {
    return;
  }

  let oldCommentData = await Comment.findByPk(newCommentData?.superior);

  let url = oldCommentData?.articleId ? `article/${oldCommentData.articleId}` : "comment";

  let mailOptions = {
    from: "353575900@qq.com",
    to: oldCommentData?.commentator,
    subject: "评论回复",
    html: `
      <h1>有人回复了您的评论</h1>
      <div>回复时间:${moment(newCommentData?.time).format("YYYY-MM-DD hh:mm:ss")}</div>
      <div>回复内容:${newCommentData?.content}</div>
      <b>
        <a href="https://blogweb.cn/${url}">点击链接查看吧</a>
      </b>
      `,
  };
  transporter.sendMail(mailOptions, (error, info) => {});
}
export default sendEmail;
