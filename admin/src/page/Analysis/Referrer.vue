<template>
  <div class="item">
    <img src="@/assets/analysis/left_top.png" class="left_top" alt="" />
    <img src="@/assets/analysis/right_bottom.png" class="right_bottom" alt="" />
    <div id="EchartsReferrer"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watchEffect } from "vue";
import * as echarts from "echarts/core";
import { TooltipComponent, LegendComponent, TitleComponent } from "echarts/components";
import { GraphicComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import IconImage from "@/assets/analysis/icon.svg";

echarts.use([TooltipComponent, LegendComponent, PieChart, GraphicComponent, TitleComponent]);
let props = defineProps({
  data: {
    type: Object,
    required: true,
    default: {},
  },
});

let data = computed(() => {
  // 把访问源数据处理成数组
  let _data = Object.keys(props.data).map(item => props.data[item].referrer);
  //如果没有数据就返回空不在处理
  if (!_data[0]) {
    return [];
  }
  /** 根据来源进行遍历*/
  return Object.keys(_data[0]).map(item => {
    /** 当前访问源七天内的访问量*/
    let value = Object.values(_data).reduce((total, val) => (total += val[item]), 0);
    return { name: item, value: value };
  });
});
const vw = (val = 1) => ((document.documentElement.clientWidth / 100) * val).toFixed(1);
let option = computed(() => {
  return {
    title: {
      text: "流量来源",
      left: "center",
      textStyle: {
        color: "#fff",
        fontSize: vw(),
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: {
        color: "white",
      },
    },
    graphic: {
      elements: [
        {
          type: "image",
          style: {
            image: IconImage,
            width: vw(6),
            height: vw(6),
          },
          left: "center",
          top: "center",
        },
      ],
    },
    series: [
      {
        name: "来源统计",
        type: "pie",
        radius: ["40%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: data.value,
        //对应的颜色列表
        color: ["#00aa48", "#ea4335", "#4e6ef2", "#00809d", "#722ed1", "#c41d7f","#24292f"],
        // data: [
        //   { value: 1048, name: "Search Engine" },
        //   { value: 735, name: "Direct" },
        //   { value: 580, name: "Email" },
        //   { value: 484, name: "Union Ads" },
        //   { value: 300, name: "Video Ads" },
        // ],
      },
    ],
  };
});

onMounted(() => {
  let myChart = echarts.init(document.getElementById("EchartsReferrer"));
  watchEffect(() => {
    myChart.setOption(option.value);
  });
});
</script>
<style scoped lang="scss">
.item {
  height: 22vw;
  width: 41.9vw;
  margin-left: 1vw;
}
#EchartsReferrer {
  width: 100%;
  height: 100%;
}
</style>
