import { useState, useRef, useEffect } from "react";
import { Button, Input, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Icon from "@/components/Icon";
import style from "./index.module.scss";
import Head from "@/modules/Head";
import axios from "axios";
import cookie from "js-cookie";
import router from "next/router";

function rss() {
  // 全局配置message
  message.config({
    top: 120,
    duration: 3,
  });
  //文本框输入的邮箱
  const [email, setEmail] = useState<string>("");
  //todo下载
  function download() {
    axios.get("/article/download").then(res => {
      const eleLink: HTMLAnchorElement = document.createElement("a");
      eleLink.download = "article.json";
      eleLink.style.display = "none";
      const blob: Blob = new Blob([res.data.data]);
      eleLink.href = URL.createObjectURL(blob);
      document.body.appendChild(eleLink);
      eleLink.click();
      document.body.removeChild(eleLink);
    });
  }
  // todo 发送验证码
  const onSendCode = () => {
    let emailCookie = cookie.get("throttle");
    if (emailCookie == email) {
      message.warn("发送失败,为减轻服务器压力，发送间隔设为1分钟，请耐心等待");
      return false;
    }
    axios.post("/send-email", { email: email }).then(res => {
      if (res.data.success) {
        message.success("发送成功，请注意查收邮件");
      } else {
        message.error("发送失败");
      }
    });
  };

  const testEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let test = /^[\s\S]*.*[^\s][\s\S]*$/; //非空
  return (
    <div className={style.container}>
      {Head({
        title: "刘润霖||订阅文章",
        keywords: "RSS,订阅文章,邮箱,JSON",
        description:
          "博客订阅页面，页面可以下载全部文章的JSON文件，可以留下你的邮箱在我们发布文章时会将文章标题、文章介绍、文章地址等信息发送至您的邮箱。",
      })}
      <div>
        <div>
          <Button type="primary" shape="round" title="下载全部文章为JSON文件" onClick={download}>
            <Icon icon={<DownloadOutlined />} />
            下载文章
          </Button>
        </div>
        <Input
          value={email}
          placeholder="请输入邮箱以便查询邮箱订阅状态"
          className={style.email_input}
          onInput={(e: any) => setEmail(e.target.value)}
        />
        <Button
          type="primary"
          shape="round"
          onClick={testEmail.test(email) ? onSendCode : null}
          disabled={!testEmail.test(email)}
          className={style.email_button}
        >
          发送验证码
        </Button>
      </div>
      <main>订阅成功，在本站更新文章后，文章标题、文章介绍、文章地址发送至您的邮箱。</main>
    </div>
  );
}
export default rss;
