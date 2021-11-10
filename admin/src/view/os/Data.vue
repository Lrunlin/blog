<template>
  <header>
    <span>系统名称：{{ osData.os_name }}</span>
    <span>闲置内存：{{ osData.blank }}</span>
    <span>全部内存：{{ osData.total }}</span>
    <span>启动时长:{{ osData.time }}</span>
  </header>
  <div id="Echarts1" style="width: 500px; height: 500px"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import axios from "axios";
import moment from "moment";
let osData = ref({});

const formatSize = (fileSize) => {
  let result = ''
  if (fileSize >= 1048576) {
    result = fileSize % 1048576 === 0 ? fileSize / 1048576 + 'MB' : Math.trunc(fileSize / 1048576) + 'MB'
  } else if (fileSize >= 1024) {
    result = fileSize % 1024 === 0 ? fileSize / 1024 + 'KB' : Math.trunc(fileSize / 1024) + 'KB'
  } else {
    result = fileSize + 'B'
  }
  return result;
}

//格式化所占空间大小
const formatData = (data) => {
  data.total = formatSize(data.memory_total)
  data.blank = formatSize(data.memory_blank)
  return data;
}
//请求相关信息
axios.get("/os").then((res) => {
  res.data.data.time = `${(res.data.data.time / 60 / 60).toFixed(1)}h`;
  osData.value = formatData(res.data.data);
});
//echarts图表
let option = {
  series: [
    {
      type: "gauge",
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      itemStyle: {
        color: "#58D9F9",
        shadowColor: "rgba(0,138,255,0.45)",
        shadowBlur: 10,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
      },
      progress: {
        show: true,
        roundCap: true,
        width: 18,
      },
      pointer: {
        icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
        length: "75%",
        width: 16,
        offsetCenter: [0, "5%"],
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 18,
        },
      },
      axisTick: {
        splitNumber: 2,
        lineStyle: {
          width: 2,
          color: "#999",
        },
      },
      splitLine: {
        length: 12,
        lineStyle: {
          width: 3,
          color: "#999",
        },
      },
      axisLabel: {
        distance: 30,
        color: "#999",
        fontSize: 20,
      },
      title: {
        show: false,
      },
      detail: {
        backgroundColor: "#fff",
        borderColor: "#999",
        borderWidth: 2,
        width: "60%",
        lineHeight: 40,
        height: 40,
        borderRadius: 8,
        offsetCenter: [0, "35%"],
        valueAnimation: true,
        formatter: function (value) {
          return "{value|" + value.toFixed(0) + "}{unit|%}";
        },
        rich: {
          value: {
            fontSize: 50,
            fontWeight: "bolder",
            color: "#777",
          },
          unit: {
            fontSize: 20,
            color: "#999",
            padding: [0, 0, -20, 10],
          },
        },
      },
      data: [
        {
          value: 100,
        },
      ],
    },
  ],
};

//DOM渲染后一秒钟请求一次
let timer;
onMounted(() => {
  var chartDom = document.getElementById("Echarts1");
  var myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
  timer = setInterval(() => {
    axios.get("/os").then((res) => {
      res.data.data.time = `${(res.data.data.time / 60 / 60).toFixed(1)}h`;
      osData.value = formatData(res.data.data);
      option.series[0].data[0].value =
        (
          (osData.value.memory_total - osData.value.memory_blank) /
          osData.value.memory_total
        ).toFixed(2) * 100;
      option && myChart.setOption(option);
    });
  }, 1000);
});
//组件销毁时删除定时器
onUnmounted(() => {
  clearInterval(timer);
});
                                                                                                                                                                                                                 </script>
<style scoped lang='scss'>
#Echarts1 {
  margin: 0px auto;
}
header {
  display: flex;
  justify-content: space-around;
}
</style>