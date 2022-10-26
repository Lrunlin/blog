import { useEffect } from "react";
import type { FC } from "react";
import * as echarts from "echarts";
import vw from "@/utils/vw";
import type { propsType } from "./index";

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

const MemoryDisk: FC<{ memory: propsType["memory"]; disk: propsType["disk"] }> = ({
  memory,
  disk,
}) => {
  useEffect(() => {
    echarts.init(document.getElementById("main4") as HTMLDivElement).setOption({
      title: [
        {
          text: "内存使用情况",
          left: "0%",
          top: "1%",
          textStyle: {
            fontSize: vw(20),
            color: "white",
          },
        },
        {
          text: "硬盘使用情况",
          right: "0%",
          top: "1%",
          textStyle: {
            fontSize: vw(20),
            color: "white",
          },
        },
      ],
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          return `${params.name} <br/> ${byteConvert(params.data.value)})`;
        },
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: "内存使用情况",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            position: "center",
            formatter: `${byteConvert(memory.occupied)}\n————\n${byteConvert(memory.total)}`,
            fontSize: vw(20),
            color: "white",
          },
          emphasis: {
            label: {
              show: false,
            },
          },
          labelLine: {
            show: false,
          },
          center: ["25%", "60%"],
          data: [
            { value: memory.total - memory.occupied, name: "未使用" },
            { value: memory.occupied, name: "已使用" },
          ],
        },
        {
          name: "硬盘使用情况",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            position: "center",
            formatter: `${byteConvert(disk.occupied)}\n————\n${byteConvert(disk.total)}`,
            fontSize: vw(20),
            color: "white",
          },
          emphasis: {
            label: {
              show: false,
            },
          },
          labelLine: {
            show: false,
          },
          center: ["75%", "60%"],
          data: [
            { value: disk.total - disk.occupied, name: "未使用" },
            { value: disk.occupied, name: "已使用" },
          ],
        },
      ],
    });
  }, [memory, disk]);
  return <div id="main4" className="server-data-container"></div>;
};
export default MemoryDisk;
