import { useState, Fragment } from "react";
import { Button, Input, Modal, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import Head from '@/modules/Head'
import axios from "axios";
function rss() {
  // 全局配置message
  message.config({
    top: 120,
    duration: 3,
  });
  //文本框输入的邮箱
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string | boolean>(false); //验证码
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); //弹窗显示
  const [emailData, setEmailData] = useState<{ rss?: boolean; label?: string }>(
    {}
  ); //用户登记状态
  const [userCode, setUserCode] = useState<string>(""); //用户输入的二维码

  const adownloadDataJson = () => {
    //? 一段下载的代码，暂时不是很理解
    // todo 主要是解决非同源下载文件问题
    const eleLink = document.createElement("a");
    eleLink.download = "article.json";
    eleLink.style.display = "none";
    const blob = new Blob([axios.defaults.baseURL + "files/article.json"]);
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
  };

  const onSendCode = () => {
    axios.post("/send-email", { email: email }).then(res => {
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
    axios.get("/rss/" + email).then(res => {
      setEmailData({
        rss: res.data.success,
        label: res.data.success
          ? "是否取消订阅？"
          : `使用此邮箱:${email}订阅博客文章？`,
      });
      onSendCode();
      setIsModalVisible(true);
    });
  };
  // todo 发送并存储验证码

  const checkCode = () => {
    if (userCode == code) {
      //?如果已经订阅就删除，如果没订阅就订阅上
      if (emailData.rss) {
        axios.delete("/rss/" + email).then(res => {
          if (res.data.success) {
            message.success("您已取消订阅");
            setIsModalVisible(false);
          } else {
            message.error("取消失败");
          }
        });
      } else {
        axios.post("/rss", { email: email }).then(res => {
          if (res.data.success) {
            message.success("订阅成功");
            setIsModalVisible(false);
          } else {
            message.error("订阅失败");
          }
        });
      }
    } else {
      message.error("请输入正确验证码");
    }
  };

  const testEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    <div className={style.container}>
      {Head({
        title: '刘润霖||订阅文章',
        keywords: 'RSS,订阅文章,邮箱,JSON',
        description: '刘润霖博客页面，页面可以下载全部文章的JSON文件，可以留下你的邮箱在我们发布文章时会邮箱通知你，并且提供对应文章的Markdown。',
      })}
      <Button
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        size="small"
        title="下载全部文章JSON格式"
        onClick={adownloadDataJson}
      >
        下载全部文章
      </Button>
      <div>
        <Input
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
          请输入邮箱
        </Button>
      </div>
      <Modal
        title={emailData.label}
        visible={isModalVisible}
        onOk={checkCode}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          placeholder="请输入收到的验证码"
          className={style.email_input}
          onInput={(e: any) => setUserCode(e.target.value)}
        />
      </Modal>
      <main>
        订阅成功，在本站更新文章后，我们会将对应的Markdown下载地址和文章地址发送至您的邮箱。
      </main>
    </div>
  );
}
export default rss;
