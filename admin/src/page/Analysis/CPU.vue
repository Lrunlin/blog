<template>
  <div class="item">
    <img src="@/assets/analysis/left_top.png" class="left_top" alt="" />
    <img src="@/assets/analysis/right_bottom.png" class="right_bottom" alt="" />
    <!-- 水波纹这个貌似是不支持title组件 -->
    <div class="title">CPU 负载</div>
    <div id="EchartsCPU"></div>
  </div>
</template>
<script setup>
import { onMounted, computed, watchEffect } from "vue";
import * as echarts from "echarts/core";
import "echarts-liquidfill";
const colorList = [
  "#d9f7be",
  "#95de64",
  "#36cfc9",
  "#13c2c2",
  "#1890ff",
  "#0050b3",
  "#d48806",
  "#874d00",
  "#cf1322",
  "#5c0011",
];

let props = defineProps({ data: { type: Number, required: true, default: 2 } });
let outLineBorderColor = computed(() => {
  let index = Math.ceil(props.data * 10) > 9 ? 9 : Math.ceil(props.data * 10);
  return colorList[index];
});
console.log(outLineBorderColor.value);
let option = computed(() => {
  return {
    series: [
      {
        type: "liquidFill",
        data: [props.data],
        radius: "70%",
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: "none",
            borderColor: outLineBorderColor.value,
            borderWidth: 8,
            shadowBlur: 20,
          },
        },
      },
    ],
  };
});
onMounted(() => {
  watchEffect(() => {
    let myChart = echarts.init(document.getElementById("EchartsCPU"));
    myChart.setOption(option.value);
  });
});
</script>
<style scoped lang="scss">
.item {
  width: 20vw;
  margin-left: 1vw;
}
#EchartsCPU {
  width: 100%;
  height: 100%;
}
.title {
  font-weight: 700;
  font-size: 1vw;
  color: white;
  text-align: center;
}
</style>
