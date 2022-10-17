import { useEffect } from "react";
import type { FC } from "react";
import * as echarts from "echarts";
import vw from "@/utils/vw";
import type { propsType } from "./index";
import moment from "moment";

/** 访问量统计*/
const Visits: FC<{ visits: propsType["visits"] }> = ({ visits }) => {
  useEffect(() => {
    let myChart = echarts.init(document.getElementById("main1") as HTMLElement);
    myChart.setOption({
      title: {
        text: "文章阅读量",
        textStyle: {
          fontSize: vw(20),
          color: "white",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        top: vw(40),
        left: vw(15),
        right: vw(20),
        bottom: vw(15),
        containLabel: true,
      },
      textStyle: {
        fontSize: vw(14),
        color: "white",
      },
      legend: {},
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: new Array(7)
          .fill(null)
          .map((_, index) => moment(+new Date()-(86_400_000*index)).format('MM-DD'))
          .reverse(),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "line",
          data: visits,
          itemStyle: {
            color: "red",
          },
        },
      ],
    });
  }, [visits]);
  return (
    <>
      <div id="main1" className="w-full h-full main-l"></div>
    </>
  );
};
export default Visits;
