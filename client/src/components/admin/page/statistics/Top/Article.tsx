import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import vw from "@/common/utils/vw";
import userAdminStatisticsData from "@/store/admin/admin-statistics-data";


function option(
  dataCPU: { value: number; name: string }[],
  dataMemory: { value: number; name: string }[],
) {
  return {
    title: {
      text: "实例状况 CPU|内存占用",
      left: vw(30),
      top: 0,
      textStyle: {
        fontSize: vw(20),
        color: "white",
      },
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: "item",
      formatter: "{b} <br/> {c} ({d}%)",
    },
    legend: {
      show: false,
    },
    label: {
      show: false,
    },
    color: ["#FF0000", "#00CC00"],
    series: [
      {
        type: "pie",
        radius: ["50%", "60%"],
        data: dataCPU,
        // top: vw(-10),
        left: vw(-240),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          show: false,
          position: "center",
        },
      },
      {
        type: "pie",
        radius: ["50%", "60%"],
        data: dataMemory,
        // top: vw(-10),
        left: vw(140),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          show: false,
          position: "center",
        },
      },
    ],
  };
}

/** 实例饼状图统计*/
const Article = () => {
  let _data = userAdminStatisticsData((s) => s.data);
  let DOM = useRef<HTMLDivElement>(null);
  let data = _data.instance_data;
  useEffect(() => {
    echarts.init(DOM.current as HTMLDivElement).setOption(
      option(
        [
          { value: data.cpu, name: "该项目占用CPU(%)" },
          { value: 100 - data.cpu, name: "" },
        ],
        [
          { value: data.memory, name: "该项目占用内存(MB)" },
          {
            value: +((data.memory_total - data.memory) / 1024 / 1024).toFixed(
              2,
            ),
            name: "",
          },
        ],
      ),
    );
  }, [_data]);

  return (
    <>
      <div ref={DOM} className="h-[12.5vw] w-[26.5vw]"></div>
    </>
  );
};
export default Article;