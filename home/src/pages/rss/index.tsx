import { useState, useRef, useEffect } from "react";
import { Button, Input, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Icon from "@/components/Icon";
import style from "./index.module.scss";
import Head from "@/modules/Head";
import axios from "axios";
import router from "next/router";

function rss() {
  // 全局配置message
  message.config({
    top: 120,
    duration: 3,
  });
  //文本框输入的邮箱
  const [email, setEmail] = useState<string>("");
  const userEmail = useRef<string>(""); //在发送验证码成功后将用户邮箱缓存
  const [code, setCode] = useState<string | boolean>(false); //验证码
  const [isRss, setIsRss] = useState<boolean>(true); //用户登记状态
  const [userCode, setUserCode] = useState<string>(""); //用户输入的验证码
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
    axios.post("/send-email", { email: userEmail.current }).then(res => {
      if (res.data.success) {
        setCode(res.data.data);
        message.success("发送成功，请注意查收邮件");
      } else {
        message.error("发送失败");
      }
    });
  };
  // todo 察看用户登记状态
  const emailSwitchState = () => {
    if (userEmail.current == email) {
      message.warning("请不要连续向相同邮箱发送验证码");
      return false;
    }
    userEmail.current = email;
    axios.get(`/rss/${userEmail.current}`).then(res => {
      setIsRss(res.data.success);
      onSendCode();
    });
  };

  // todo 验证验证码，并进行 订阅/取消操作
  const checkCode = () => {
    if (userCode == code && test.test(userCode)) {
      //?如果已经订阅就删除，如果没订阅就订阅上
      if (isRss) {
        axios.delete("/rss/" + userEmail.current, { params: { code: userCode } }).then(res => {
          if (res.data.success) {
            message.success("您已取消订阅");
            setUserCode("");
            setEmail("");
            setCode("");
          } else {
            message.error(res.data.message);
          }
        });
      } else {
        axios.post("/rss", { email: userEmail.current,code:userCode }).then(res => {
          if (res.data.success) {
            message.success("订阅成功");
            setUserCode("");
            setEmail("");
            setCode("");
          } else {
            message.error(res.data.message);
          }
        });
      }
    } else {
      message.error("请输入正确验证码");
    }
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
          onClick={testEmail.test(email) ? emailSwitchState : null}
          disabled={!testEmail.test(email)}
          className={style.email_button}
        >
          发送验证码
        </Button>
      </div>
      <Input
        placeholder="请输入收到的验证码"
        className={style.email_input}
        value={userCode}
        // 只要数字，输入时候过滤一下
        onInput={(e: any) => (isNaN(+e.target.value) ? false : setUserCode(e.target.value))}
        maxLength={4}
      />
      <Button
        type="primary"
        shape="round"
        className={style.email_button}
        onClick={checkCode}
        disabled={!code}
        title={
          !code ? "请输入邮箱并发送验证码" : `${userEmail.current}${isRss ? "取消订阅" : "订阅"}`
        }
      >
        {!code ? "请输入邮箱" : isRss ? "取消订阅" : "订阅"}
      </Button>
      <main>订阅成功，在本站更新文章后，文章标题、文章介绍、文章地址发送至您的邮箱。</main>
    </div>
  );
}
export default rss;
