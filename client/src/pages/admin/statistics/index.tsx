import { useEffect, useRef } from "react";
import { Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import useSwr from "swr";
import axios from "axios";
import Top from "@/components/admin/page/statistics/Top";
import Bottom from "@/components/admin/page/statistics/Bottom";
import type { statisticsDataType } from "./type";
import { atom, useRecoilState } from "recoil";

export type { statisticsDataType };
import Head from "@/components/next/Head";
export const statisticsDataContext = atom({
  key: "statistics-data",
  default: null as unknown as statisticsDataType,
});
const Statistics = () => {
  let {
    data: fetchData,
    isValidating,
    error,
  } = useSwr(
    "/statistics/visualization",
    () => axios.get("/statistics/visualization").then(res => res.data.data),
    { refreshInterval: 10000 }
  );
  let [data, setData] = useRecoilState(statisticsDataContext);

  let isFirstLoad = useRef(true);
  useEffect(() => {
    if (isValidating) isFirstLoad.current = false;
  }, [isValidating]);

  useEffect(() => {
    if (fetchData) setData(fetchData);
  }, [fetchData]);

  return (
    <>
      <Head title="数据分析" />
      <Spin
        spinning={isValidating && isFirstLoad.current}
        size="large"
        tip="请求中..."
        className="w-screen h-screen"
      >
        <div
          className="min-h-screen min-w-full"
          style={{
            backgroundImage: `url(/image/admin/statistics/bg.jpg)`,
            backgroundSize: "100vw 100vh",
          }}
        >
          <div className="text-2xl text-statistics-cyan-color text-center font-black pt-0.25vw">数据分析</div>
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
            <main className="mx-auto w-96vw mt-3vh">
              <div>
                <Top />
              </div>
              <div>
                <Bottom />
              </div>
            </main>
          )}
        </div>
      </Spin>
    </>
  );
};
export default Statistics;
