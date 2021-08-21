import React, { useState, useEffect, useRef } from "react";
import style from "./index.module.scss";
import Link from "next/link";
// import router from "next/router";
import { Col, Row, BackTop, Button } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  UserOutlined,
  DeploymentUnitOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import axios from "axios";
export default function Header() {
  useEffect(() => {
    // todo 随机展示一个词条
    axios.get("/message").then(res => {
      const index: number = Math.floor(Math.random() * res.data.data.length);
      const style = [
        `background:#585858;
      color:white;
      border-top-left-radius:3px;
      border-bottom-left-radius:3px;
      padding:3px
      `,
        `background:#4dc71f;
      color:white;
      border-top-right-radius:3px;
      border-bottom-right-radius:3px;
      padding:3px
      `,
      ];
      console.log(`%cauthor:%c刘润霖`, ...style);
      console.log(`%cURL:%cblogweb.cn`, ...style);
      console.log(
        `%cTechnology stack:%cNextJs,Vue3,Node-Express,MySql`,
        ...style
      );
      console.log(`%cmessage:%c${res.data.data[index].message}`, ...style);
    });
  }, []);

  const [active, setActive] = useState<boolean>(false);
  return (
    <header className={style.header + ` ${active ? style.header_active : ""}`}>
      <Button
        type="primary"
        className={`phone ${style.header_switch_ico}`}
        onClick={() => setActive(!active)}
      >
        <MenuUnfoldOutlined />
      </Button>
      <Row justify="space-between" className={style.nav}>
        <Col sm={8} className={style.logo}>
          <h1>
            <a href="/">刘润霖</a>
          </h1>
          <span>
           原创文章&nbsp;博客无需抄袭
          </span>
        </Col>

        <Col sm={6}>
          <nav>
            <Link href="/">
              <a>
                <HomeOutlined />
                首页
              </a>
            </Link>
            <Link href="/search">
              <a>
                <SearchOutlined /> 搜索文章
              </a>
            </Link>
            <Link href="/about">
              <a>
                <UserOutlined /> 关于作者
              </a>
            </Link>
            <Link href="/rss">
              <a className="phone">
                <DeploymentUnitOutlined /> 订阅
              </a>
            </Link>
          </nav>
        </Col>
      </Row>
      <BackTop />
    </header>
  );
}
