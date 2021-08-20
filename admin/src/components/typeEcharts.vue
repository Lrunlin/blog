<template>
  <div
    ref="echartsDom"
    style="width: 600px; height: 600px; margin: 30px auto 0px auto"
  ></div>
</template>
<script setup>
import { ref, defineProps, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps(["data"]);
watch(props, (nValue, oValue) => {
  let option = [];
  let result = {}; //结果
  let type = []; //所有类型
  const data = props.data;
  data.forEach((item) => {
    type = type.concat(item.type.split(","));
  });
  type.forEach((item) => {
    if (result[item]) {
      result[item]++;
    } else {
      result[item] = 1;
    }
  });
  Object.keys(result).forEach((item) => {
    option.push({ name: item, value: result[item] });
  });
  createEchart(option);
});
const echartsDom = ref(null);
function createEchart(data) {
  const myChart = echarts.init(echartsDom.value);
  myChart.setOption({
    title: {
      text: "文章各类型对应文章数量统计",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      left: "center",
      top: 50,
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "50%",
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });
}
</script>
<style scoped lang='scss'>
</style>