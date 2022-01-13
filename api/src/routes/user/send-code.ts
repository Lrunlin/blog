import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import nodemailer from "nodemailer";
import { addUserEmail, hasUserEmail } from "@/store/userEmail";

router.post("/email/send", async (req: Request, res: Response, next: NextFunction) => {
  let transporter = nodemailer.createTransport({
    service: "qq",
    port: 587,
    secure: false,
    auth: {
      user: "353575900@qq.com",
      pass: "mcnntrlfnjkjcaae",
    },
  });
  let email = req.body.email;

  let test =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!test.test(email)) {
    res.json({
      success: false,
      message: "您的邮箱格式不正确",
    });
    return false;
  }

  const code = (Math.random() + "").substring(3, 7);
  let mailOptions = {
    from: "353575900@qq.com",
    to: email,
    subject: "验证码",
    html: `
        <div style="font-size:24px;">您的验证码为: <b>${code}</b> </div>
        <div>您正在<a href="https://blogweb.cn">博客平台</a>注册账号</div>
        <div>验证码半小时内有效</div>
        <div>如果您并没有执行该操作经忽略本邮件</div>
        <div>本站首页:<a href="https://blogweb.cn">博客首页</a></div>
        `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({
        success: false,
        message: "发送失败",
      });
      return false;
    }

    res.cookie("throttle", email, {
      httpOnly: false,
      secure: true,
      path: "/",
      maxAge: 60000,
    });
    res.json({
      success: true,
      message: "发送成功",
    });
    addUserEmail(email, code);
  });
});
export default router;
