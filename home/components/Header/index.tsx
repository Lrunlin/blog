import React, { useState, useEffect } from "react";
import Image from "next/image";
import style from "./index.module.scss";
import Link from "next/link";
import {
  HomeOutlined,
  SearchOutlined,
  StockOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function Header() {
  const [code, setCode] = useState<string | boolean>(false);

  let imgData = [
    {
      src: "github",
      url: "https://github.com/Lrunlin",
    },
    {
      src: "qq",
    },
    {
      src: "wechat",
    },
  ];
  // 随机展示一个背景图片
  const bg = `https://blogweb.cn/files/background/bg-${
    Math.floor(Math.random() * 6) + 1
  }.jpg`;
  const headerDom: any = React.createRef();
  useEffect(() => {
    headerDom.current.style.backgroundImage = `url(${bg})`;
    document.body.style.paddingLeft = "270px";
  }, []);

  return (
    <header className={style.header} ref={headerDom}>
      <div className={style.face_box}>
        <Image
          src="/assets/writer-face.png"
          alt="作者头像"
          width={150}
          height={150}
          className={style.face}
        />
      </div>
      <div className={style.name}>
        <h2>刘润霖</h2>
        <p>WEB开发</p>
      </div>
      <nav>
        <Link href="/">
          <a>
            <HomeOutlined />
            <span>首页</span>
          </a>
        </Link>
        <Link href="/search">
          <a>
            <SearchOutlined />
            <span>搜索</span>
          </a>
        </Link>
        <Link href="/updata-log">
          <a>
            <StockOutlined />
            <span>更新日志</span>
          </a>
        </Link>
        <Link href="/about">
          <a>
            <UserOutlined />
            <span>关于作者</span>
          </a>
        </Link>
      </nav>
      <div className={style.foot}>
        {imgData.map((item: { src: string; url: string }, index: number) => {
          return (
            <a
              href={item.url || null}
              key={item.src}
              target={item.src == "github" ? "_black" : null}
            >
              <img
                onClick={() => !item.url && setCode(item.src)}
                // 只有QQ和微信两个有效，因为这两个没有url所以是true
                src={`/assets/${item.src}.png`}
                alt={`作者的${item.src}`}
              />
            </a>
          );
        })}
      </div>
      <div
        className={style.layer}
        style={{ display: code ? "block" : "none" }}
        onClick={() => setCode(false)}
      >
        {code && (
          <img src={`/assets/${code}-qrcode.jpg`} alt="联系方式二维码" />
        )}
      </div>
    </header>
  );
}
