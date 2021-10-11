import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
// import router from "next/router";
import { Col, Row, BackTop } from "antd";
import Icon from "@/components/Icon";

import {
  HomeOutlined,
  SearchOutlined,
  UserOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";

interface nav {
  label: string;
  url: string;
  icon: JSX.Element;
  isPhone?: boolean;
}

export default function Header() {
  useEffect(() => {
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
    console.log(`%cTechnology stack:%cNextJs,Vue3,Node-Express,MySql`, ...style);
    console.log("如果你对本站源码感兴趣,不妨添加联系方式一起研究");
  }, []);

  const data: nav[] = [
    {
      label: "首页",
      url: "/",
      icon: <HomeOutlined />,
    },
    {
      label: "搜索文章",
      url: "/search",
      icon: <SearchOutlined />,
    },
    {
      label: "订阅",
      url: "/rss",
      icon: <DeploymentUnitOutlined />,
      isPhone: true,
    },
    {
      label: "关于作者",
      url: "/about",
      icon: <UserOutlined />,
    },
  ];
  return (
    <header className={style.header}>
      <Row justify="space-between" className={style.nav}>
        <Col sm={8} className={style.logo}>
          <h1>
            <a href="/">刘润霖</a>
          </h1>
          <span>
            原创文章&nbsp;<span style={{ color: "white" }}>博客无需抄袭</span>
          </span>
        </Col>

        <Col sm={6} className={style.phone_nav}>
          <nav>
            {data.map((item: nav) => {
              return (
                <Link href={item.url} key={item.url}>
                  {/* 判断是否phone和active */}
                  <a
                    className={
                      (!!item.isPhone && "phone") +
                      ` ${useRouter().asPath == item.url && style.active}`
                    }
                  >
                    <Icon icon={item.icon} />
                    <span className="pc">{item.label}</span>
                  </a>
                </Link>
              );
            })}
          </nav>
        </Col>
      </Row>
      <BackTop />
    </header>
  );
}
