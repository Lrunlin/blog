import { useEffect, useRef } from "react";
import type { FC } from "react";
import * as echarts from "echarts";
import vw from "@/utils/vw";
import type { propsType } from "./index";

function option(data: propsType["referer"]) {
  return {
    title: {
      text: "文章访问来源",
      left: 0,
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
      orient: "vertical",
      top: vw(30),
      left: 0,
      textStyle: {
        fontSize: vw(13, 12),
        color: "white",
      },
    },
    label: {
      color: "white", // 改变标示文字的颜色
      fontSize: vw(13, 12),
    },
    series: [
      {
        type: "pie",
        radius: "70%",
        data: data.map(item => ({
          name: item.referer_label,
          value: item.count,
        })),
        top: vw(-10),
        left: vw(140),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        itemStyle: {
          color: function (colors: any) {
            return data[colors.dataIndex].referer_color;
          },
        },
      },
    ],
  };
}

/** 文章饼状图统计*/
const Article: FC<{ data: propsType["referer"] }> = ({ data }) => {
  let DOM = useRef<HTMLDivElement>(null);
  useEffect(() => {
    echarts.init(DOM.current as HTMLDivElement).setOption(option(data));
  }, [data]);

  return (
    <>
      <div ref={DOM} className="w-full h-full main-l"></div>
    </>
  );
};
export default Article;
