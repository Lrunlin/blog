<template>
  <div id="AccessRecordEchartsDOM" style="width: 90%; height: 600px"></div>
</template>
<script setup>
import { computed, onMounted, watchEffect } from "vue";
import * as echarts from "echarts/core";
import { GridComponent, TooltipComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TooltipComponent]);


// import * as echarts from "echarts";


let props = defineProps({
  data: {
    required: true,
    type: Object,
    default: {},
  },
});
let option = computed(() => {
  return {
    xAxis: {
      type: "category",
      data: Object.keys(props.data),
    },
    yAxis: { type: "value" },
    series: [
      {
        data: Object.values(props.data),
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
});
onMounted(() => {
  watchEffect(() => {
    let chartDom = document.getElementById("AccessRecordEchartsDOM");
    let myChart = echarts.init(chartDom);
    myChart.setOption(option.value);
  });
});
</script>
