"use client";

import { useEffect, useMemo } from "react";
import type { FC } from "react";
import { CloseOutlined } from "@ant-design/icons";
import axios from "@axios";
import { response } from "@type/response";
import type { statisticsDataType } from "@type/statistics-type";
import useFetch from "@/common/hooks/useFetch";
import Bottom from "@/components/admin/page/statistics/Bottom";
import Top from "@/components/admin/page/statistics/Top";

const Statistics: FC<{ data: statisticsDataType }> = (props) => {
  let {
    data: fetchData,
    error,
    refetch,
  } = useFetch(
    () =>
      axios
        .get<response<statisticsDataType>>("/statistics/visualization")
        .then((res) => res.data.data),
    { manual: true },
  );

  let data = useMemo(() => fetchData || props.data, [fetchData, props.data]);

  useEffect(() => {
    let timer = setInterval(() => {
      refetch();
    }, 20000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {data ? (
        <main className="mx-auto mt-[4vh] w-[96vw]">
          <div>
            <Top />
          </div>
          <div>
            <Bottom />
          </div>
        </main>
      ) : (
        <div className="mt-10 text-center text-2xl font-black text-white">
          <CloseOutlined
            style={{ fontSize: "48px", color: "red" }}
            className="rounded-full border-solid border-red-700"
          />
          <div className="mt-4">请求失败</div>
        </div>
      )}
    </>
  );
};
export default Statistics;
