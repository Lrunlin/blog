import { useEffect, useRef } from "react";
import { Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import useSwr from "swr";
import axios from "axios";
import Header from "@/components/page/statistics/Header";
import Main from "@/components/page/statistics/Main";
import Aside from "@/components/page/statistics/Aside";
import bg from "@/assets/statistics/bg.jpg";
import "./index.scss";

const Statistics = () => {
  let { data, isValidating, error } = useSwr(
    "/statistics/visualization",
    () => axios.get("/statistics/visualization").then(res => res.data.data),
    { refreshInterval: 10000 }
  );

  let isFirstLoad = useRef(true);
  useEffect(() => {
    if (isValidating) isFirstLoad.current = false;
  }, [isValidating]);

  return (
    <>
      <Spin
        spinning={isValidating && isFirstLoad.current}
        size="large"
        tip="请求中..."
        className="w-screen h-screen"
      >
        <div
          className="min-h-screen min-w-full"
          style={{
            backgroundImage: `url('${bg}')`,
            backgroundSize: "100vw 100vh",
          }}
        >
          <div className="container-title">数据分析</div>

          {error && (
            <div className="text-white text-center text-2xl font-black mt-10 ">
              <CloseOutlined
                style={{ fontSize: "48px", color: "red" }}
                className="border-solid border-red-700 rounded-full"
              />
              <div className="mt-4">请求失败</div>
            </div>
          )}
          {data && (
            <main className="main flex justify-around">
              <div className="main-left">
                <Header type={data.type} user={data.user} link={data.link} />
                <Main
                  referer={data.referer}
                  visits={data.visits}
                  article={data.article}
                  loadavg={data.loadavg}
                />
              </div>
              <div className="main-right">
                <Aside
                  article_ranking={data.article_ranking}
                  memory={data.memory}
                  disk={data.disk}
                />
              </div>
            </main>
          )}
        </div>
      </Spin>
    </>
  );
};
export default Statistics;
