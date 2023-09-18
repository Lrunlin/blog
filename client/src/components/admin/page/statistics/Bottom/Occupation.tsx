import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import vw from "@/common/utils/vw";
import { useRecoilValue } from "recoil";
import { statisticsDataContext, statisticsDataType } from "@/pages/admin/statistics";
const byteConvert = function (bytes: number) {
  let symbols = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let exp = Math.floor(Math.log(bytes) / Math.log(2));
  if (exp < 1) {
    exp = 0;
  }
  let i = Math.floor(exp / 10);
  bytes = bytes / Math.pow(2, 10 * i);
  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
    bytes = +bytes.toFixed(1);
  }
  return bytes + " " + symbols[i];
};

function option(data: statisticsDataType["system_occupation"]) {
  return {
    title: {
      text: "负载情况",
      textStyle: {
        fontSize: vw(20),
        color: "white",
      },
    },
    grid: {
      top: vw(40),
      left: vw(15),
      right: vw(25),
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
      data: data.map(item => item.time),
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let item = data[params[0]["dataIndex"]];

        let m = `内存使用:${byteConvert(item.memory.occupied)}/${byteConvert(
          item.memory.total
        )}  ${((item.memory.occupied / item.memory.total) * 100).toFixed(0)}%`;

        let d = `硬盘使用:${byteConvert(item.disk.occupied)}/${byteConvert(item.disk.total)}  ${(
          (item.disk.occupied / item.disk.total) *
          100
        ).toFixed(0)}%`;

        let c = `负载情况:${item.loadavg.toFixed(0)}%`;
        return `${m}<br/>${d}<br/>${c}`;
      },
    },
    series: [
      {
        name: "内存使用",
        type: "line",
        data: data.map(item => ((item.memory.occupied / item.memory.total) * 100).toFixed(0)),
        itemStyle: {
          color: "green",
        },
      },
      {
        name: "硬盘使用",
        type: "line",
        data: data.map(item => ((item.disk.occupied / item.disk.total) * 100).toFixed(0)),
        itemStyle: {
          color: "yellow",
        },
      },
      {
        name: "负载",
        type: "line",
        data: data.map(item => item.loadavg),
        itemStyle: {
          color: "red",
        },
      },
    ],
  };
}

/** 文章饼状图统计*/
const Article = () => {
  let _data = useRecoilValue(statisticsDataContext);
  let DOM = useRef<HTMLDivElement>(null);
  let data = _data.system_occupation;
  useEffect(() => {
    echarts.init(DOM.current as HTMLDivElement).setOption(option(data));
  }, [_data]);

  return (
    <>
      <div ref={DOM} className="w-full h-full"></div>
    </>
  );
};
export default Article;
