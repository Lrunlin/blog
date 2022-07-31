import nodemailer from "nodemailer";
interface paramsType {
  /** 接收人*/
  target: string;
  /** 主题*/
  subject: string;
  /** 内容HTML*/
  content: string;
}

let transporter = nodemailer.createTransport({
  service: "qq",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_KEY,
  },
});
function sendEmail(params: paramsType) {
  return new Promise<void>((resolve, reject)=> {
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: params.target,
      subject: params.subject,
      html: params.content,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
export default sendEmail;
