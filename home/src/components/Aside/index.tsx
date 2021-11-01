import Image from "next/image";
import Link from "next/link";
// import router from "next/router";
import { useState } from "react";
import style from "./index.module.scss";
import Icon from "@/components/Icon";
import Message from "@/components/Message";
import { Tag, Tooltip, Divider, Row } from "antd";
import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined,
  MailFilled,
  DeploymentUnitOutlined,
  FormOutlined,
} from "@ant-design/icons";
export default function Aside() {
  const tagData = [
    {
      type: "magenta",
      text: "刘润霖",
    },
    {
      type: "red",
      text: "WEB前端博客",
    },
    {
      type: "cyan",
      text: "Antd",
    },
    {
      type: "cyan",
      text: "Next.js",
    },
    {
      type: "cyan",
      text: "Hooks",
    },
    {
      type: "cyan",
      text: "Express",
    },
  ];
  const [messageActive, setEessageActive] = useState<boolean>(false); //是否展示留言
  return (
    <aside className={style.container}>
      <div className={style.face_box}>
        <Image src="/face.png" alt="刘润霖头像" width={130} height={130} className={style.face} />
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
      <Row className={style.contact}>
        <Tooltip placement="top" title="LRunLin的GitHUb">
          <span>
            <a href="https://github.com/Lrunlin/" target="_blank">
              <Icon icon={<GithubOutlined />} />
            </a>
          </span>
        </Tooltip>
        <Tooltip placement="top" title="QQ:1974109227">
          <span>
            <Icon icon={<QqOutlined />} />
          </span>
        </Tooltip>
        <Tooltip placement="top" title="微信:webdaizuo">
          <span>
            <Icon icon={<WechatOutlined />} />
          </span>
        </Tooltip>
        <Tooltip placement="top" title="353575900@qq.com">
          <span>
            <a href="mailto:353575900@qq.com" rel="external nofollow">
              <Icon icon={<MailFilled />} />
            </a>
          </span>
        </Tooltip>
      </Row>
      <Divider>订阅|留言</Divider>
      <Row className={style.contact}>
        <Link href="/rss">
          <Tooltip placement="top" title="订阅文章">
            <a>
              <Icon>
                <DeploymentUnitOutlined className={style.icon} />
              </Icon>
            </a>
          </Tooltip>
        </Link>
        <Tooltip placement="top" title="留言">
          <span>
            <Icon>
              <FormOutlined className={style.icon} onClick={() => setEessageActive(true)} />
            </Icon>
          </span>
        </Tooltip>
      </Row>
      {messageActive && (
        <Message switchMessageState={(state: boolean) => setEessageActive(state)} />
      )}
    </aside>
  );
}
