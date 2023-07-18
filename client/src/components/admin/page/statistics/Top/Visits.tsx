import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import vw from "@/common/utils/vw";
import { useRecoilValue } from "recoil";
import { statisticsDataContext } from "@/pages/admin/statistics";
/** 访问量统计*/
const Visits = () => {
  let data = useRecoilValue(statisticsDataContext);
  let visits = data.visits;
  let DOM = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let myChart = echarts.init(DOM.current as HTMLElement);
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
      legend: {
        show: false,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: visits.map(item => item.time),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "阅读数",
          type: "line",
          data: visits.map(item => item.view_count),
          itemStyle: {
            color: "red",
          },
        },
        {
          name: "IP数",
          type: "line",
          data: visits.map(item => item.ip_count),
          itemStyle: {
            color: "yellow",
          },
        },
      ],
    });
  }, [data]);
  return (
    <>
      <div ref={DOM} className="w-39vw h-12.5vw"></div>
    </>
  );
};
export default Visits;
