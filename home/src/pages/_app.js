import { Row } from "antd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Aside from "@/components/Aside";
import router from "next/router";

import "antd/dist/antd.css";
import "@/style/style.scss";
import "@/style/highLight.scss";
import style from "@/style/style.module.scss";
import "@/modules/axios";
import { useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";

function MyApp({ Component, pageProps }) {
  router.events.on("routeChangeStart", () => {
    setLoading("block");
  });
  router.events.on("routeChangeComplete", () => {
    setLoading("none");
  });
  router.events.on("routeChangeError", () => {
    setLoading("none");
  });
  const [loading, setLoading] = useState("none");
  return (
    <>
      <Header />
      <Row justify="space-between" className={style.container}>
        <div className={style.main}>
          <div id={style.alert} style={{ display: loading }}>
            <LoadingOutlined className={style.icon} />
          </div>
          <Component {...pageProps} />
        </div>
        {/* 注意计算问题Aside有padding:10px */}
        <div style={{ width: "260px" }} className="pc">
          <Aside />
        </div>
      </Row>
      <Footer />
    </>
  );
}

export default MyApp;
