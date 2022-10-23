import { useEffect, Fragment } from "react";
import type { FC } from "react";
import type { propsType } from ".";
import * as echarts from "echarts";
import classNames from "classnames";
import vw from "@/utils/vw";

const Loadavg: FC<{ data: propsType["loadavg"] }> = ({ data }) => {
  let doms = new Array(3).fill(<></>).map((_, index) => `echarts-loadavg-${index}`);
  useEffect(() => {
    let time = [1, 5, 15];
    doms.forEach((item, index) => {
      echarts
        .init((document.getElementsByClassName(item) as unknown as HTMLElement[])[0])
        .setOption({
          title: {
            text: `${time[index]} 分钟负载`,
            top: vw(0),
            left: "center",
            textStyle: {
              fontSize: vw(14, 14),
              color: "white",
            },
          },
          tooltip: {
            show: false,
          },
          series: [
            {
              radius: "70%",
              type: "gauge",
              axisLine: {
                lineStyle: {
                  width: vw(30,undefined,30),
                  color: [
                    [0.3, "#67e0e3"],
                    [0.7, "#37a2da"],
                    [1, "#fd666d"],
                  ],
                },
              },
              pointer: {
                itemStyle: {
                  color: "auto",
                },
              },
              axisTick: {
                distance: vw(-30),
                length: vw(3),
                lineStyle: {
                  color: "#fff",
                  width: vw(5),
                },
              },
              splitLine: {
                distance: vw(-30),
                length: vw(30),
                lineStyle: {
                  color: "#fff",
                  width: vw(4),
                },
              },
              axisLabel: {
                show: false,
              },
              detail: {
                valueAnimation: true,
                formatter: "{value} %",
                color: "inherit",
                fontSize: vw(16, 14),
              },
              data: [{ value: data[index] }],
            },
          ],
        });
    });
  }, [data]);

  return (
    <div className="main-s relative">
      <div className={classNames(["echarts-loadavg-0", "loadavg-item"])}></div>
      <div className={classNames(["echarts-loadavg-1", "loadavg-item"])}></div>
      <div className={classNames(["echarts-loadavg-2", "loadavg-item"])}></div>
    </div>
  );
};
export default Loadavg;
