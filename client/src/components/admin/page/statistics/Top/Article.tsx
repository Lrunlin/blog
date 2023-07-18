import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import vw from "@/common/utils/vw";
import { useRecoilValue } from "recoil";
import { statisticsDataContext } from "@/pages/admin/statistics";

function option(data: { value: number; name: string }[]) {
  return {
    title: {
      text: "文章数量分析",
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
        data: data,
        top: vw(-10),
        left: vw(140),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
}

/** 文章饼状图统计*/
const Article = () => {
  let _data = useRecoilValue(statisticsDataContext);
  let DOM = useRef<HTMLDivElement>(null);
  let data = _data.article;
  useEffect(() => {
    echarts.init(DOM.current as HTMLDivElement).setOption(
      option([
        { value: data.admin_reprint_count, name: "管理员转载文章" },
        { value: data.admin_not_reprint_count, name: "管理员原创文章" },
        { value: data.user_reprint_count, name: "用户转载文章" },
        { value: data.user_not_reprint_count, name: "用户原创文章" },
      ])
    );
  }, [_data]);

  return (
    <>
      <div ref={DOM} className="w-26.5vw h-12.5vw"></div>
    </>
  );
};
export default Article;
