<template>
  <div class="item">
    <img src="@/assets/analysis/left_top.png" class="left_top" alt="" />
    <img src="@/assets/analysis/right_bottom.png" class="right_bottom" alt="" />
    <div id="EchartsVisits"></div>
  </div>
</template>
<script setup>
import { computed, onMounted, watchEffect } from "vue";
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
let props = defineProps({
  data: {
    type: Object,
    required: true,
    default: {},
  },
});
const vw = (val = 1) => ((document.documentElement.clientWidth / 100) * val).toFixed(1);
let option = computed(() => {
  return {
    title: {
      text: "7日访问量",
      left: "center",
      textStyle: {
        color: "#fff",
        fontSize: vw(),
      },
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: Object.keys(props.data).map(item => item.substring(5)),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: Object.values(props.data).map(item => item.visits),
        type: "line",
        smooth: true,
      },
    ],
  };
});
onMounted(() => {
  watchEffect(() => {
    let myChart = echarts.init(document.getElementById("EchartsVisits"));
    myChart.setOption(option.value);
  });
});
</script>
<style scoped lang="scss">
.item {
  width: 40vw;
  margin-left: 1vw;
}
#EchartsVisits {
  height: 100%;
  width: 100%;
}
</style>
