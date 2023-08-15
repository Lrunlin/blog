import { useEffect, useMemo } from "react";
import type { FC } from "react";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { RecoilRoot } from "recoil";

import Top from "@/components/admin/page/statistics/Top";
import Bottom from "@/components/admin/page/statistics/Bottom";
import type { statisticsDataType } from "./type";
import { atom } from "recoil";
import { parse } from "cookie";

export type { statisticsDataType };
import Head from "@/components/next/Head";
import { GetServerSideProps } from "next";
import useFetch from "@/common/hooks/useFetch";
import { response } from "@type/response";
export const statisticsDataContext = atom({
  key: "statistics-data",
  default: null as unknown as statisticsDataType,
});
const Statistics: FC<{ data: statisticsDataType }> = props => {
  let {
    data: fetchData,
    error,
    refetch,
  } = useFetch(
    () =>
      axios
        .get<response<statisticsDataType>>("/statistics/visualization")
        .then(res => res.data.data),
    true
  );

  let data = useMemo(() => fetchData || props.data, [fetchData, props.data]);

  let timer: any;
  useEffect(() => {
    timer = setInterval(() => {
      refetch();
    }, 20000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <RecoilRoot initializeState={({ set }) => set(statisticsDataContext, data)}>
        <Head title="数据分析" />
        <div
          className="min-h-screen min-w-full"
          style={{
            backgroundImage: `url(${process.env.CDN}/image/admin/statistics/bg.jpg)`,
            backgroundSize: "100vw 100vh",
          }}
        >
          <div className="text-2xl text-statistics-cyan-color text-center font-black pt-0.25vw">
            数据分析
          </div>
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
      </RecoilRoot>
    </>
  );
};
export default Statistics;

export const getServerSideProps: GetServerSideProps = async ctx => {
  let { token } = parse(ctx?.req?.headers?.cookie + "");

  let data = await axios
    .get<response<statisticsDataType>>("/statistics/visualization", {
      headers: { authorization: token || "" },
    })
    .then(res => res.data.data);

  return { props: { data: data } };
};
