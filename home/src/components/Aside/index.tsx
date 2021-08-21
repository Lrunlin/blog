import Image from "next/image";
import Link from "next/link";
// import router from "next/router";
import { useState, useEffect } from "react";
import style from "./index.module.scss";
import { Tag, Tooltip, Divider, Row } from "antd";
import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined,
  MailFilled,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
export default function Aside() {
  const tagData = [
    {
      type: "magenta",
      text: "刘润霖",
    },
    {
      type: "red",
      text: "WEB博客",
    },
    {
      type: "cyan",
      text: "React.js",
    },
    {
      type: "cyan",
      text: "antd",
    },
    {
      type: "cyan",
      text: "Next.js",
    },
    {
      type: "purple",
      text: "小白",
    },
  ];
  const [rotate, setRotate] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setRotate(document.documentElement.scrollTop);
    });
  }, []);
  return (
    <aside className={style.container}>
      <div className={style.face_box}>
        <Image
          src="/face.png"
          alt="刘润霖头像"
          width={130}
          height={130}
          className={style.face}
        />
        <Link href="https://admin.blogweb.cn/">
          <h1 className={style.name}>刘润霖</h1>
        </Link>
        <div className={style.tags}>
          {tagData.map((item: { type: string; text: string }, index) => {
            return (
              <Tag color={item.type} key={item.text}>
                {item.text}
              </Tag>
            );
          })}
        </div>
      </div>
      <Divider>社交账号</Divider>
      <Row justify="space-around" className={style.contact}>
        <Tooltip placement="top" title="LRunLin的GitHUb">
          <a href="https://github.com/Lrunlin/" target="_blank">
            <GithubOutlined style={{ transform: `rotate(${rotate}deg)` }} />
          </a>
        </Tooltip>
        <Tooltip placement="top" title="QQ:1974109227">
          <QqOutlined />
        </Tooltip>
        <Tooltip placement="top" title="微信:webdaizuo">
          <WechatOutlined />
        </Tooltip>
        <Tooltip placement="top" title="353575900@qq.com">
          <a href="mailto:353575900@qq.com" rel="external nofollow">
            <MailFilled />
          </a>
        </Tooltip>
      </Row>
      <Divider>订阅</Divider>
      <Row justify="space-around" className={style.contact}>
        <Link href="/rss">
          <a>
            <Tooltip placement="top" title="订阅和下载文章内容">
              <DeploymentUnitOutlined className={style.icon} />
            </Tooltip>
          </a>
        </Link>
      </Row>
    </aside>
  );
}
