<template>
  <div class="item">
    <img src="@/assets/analysis/left_top.png" class="left_top" alt="" />
    <img src="@/assets/analysis/right_bottom.png" class="right_bottom" alt="" />
    <div id="EchartArticleType"></div>
    <div class="btns">
      <div
        class="btn"
        :class="{ active: item.includes(activeKey) }"
        @click="activeKey = item"
        v-for="(item, index) in key"
        :key="item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watchEffect, watch } from "vue";
import * as echarts from "echarts/core";
import { GridComponent, TooltipComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([GridComponent, BarChart, CanvasRenderer, TooltipComponent]);

let props = defineProps({
  data: {
    type: Object,
    required: true,
    default: {},
  },
});
const vw = (val = 1) => ((document.documentElement.clientWidth / 100) * val).toFixed(1);
// 格式化props中的data，并且删除多余数据
let data = computed(() => {
  let year = new Date().getFullYear();
  let test1 = new RegExp(`${year - 1}-`, "g");
  let test2 = new RegExp(`${year}-`, "g");
  let test3 = new RegExp(`${year + 1}-`, "g");
  let _dataString = JSON.stringify(props.data)
    .replace(test1, "")
    .replace(test2, "")
    .replace(test3, "");
  let _data = JSON.parse(_dataString);
  Object.keys(_data).forEach(item => {
    delete _data[item].visits;
    delete _data[item].referrer;
  });
  return _data;
});

let key = computed(() => Object.keys(data.value));
let activeKey = ref();
watch(key, newValue => {
  activeKey.value = newValue.slice(-1);
});
let option = computed(() => {
  if (!activeKey.value) {
    return {};
  }
  let typesData = data.value[activeKey.value].type;
  //将数组处理格式排序，保留前四，在颠倒（不颠倒图是反的）
  let _data = Object.keys(typesData)
    .map(item => {
      return { type: item, number: typesData[item] };
    })
    .sort((a, b) => b.number - a.number)
    .slice(0, 4)
    .reverse();

  return {
    xAxis: {
      type: "value",
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      data: _data.map(item => item.type),
      axisLabel: {
        show: false,
      },
    },
    grid: {
      x: vw(0.5),
      y: 0,
      x2: vw(0.5),
      y2: vw(0.5),
    },
    tooltip: {},
    label: {
      show: true,
      position: "inside",
      color: "#FFFFFF",
      fontSize: vw(),
      formatter: function (params) {
        return `${params.name}  (${params.value})`;
      },
    },
    itemStyle: {
      //柱状图样式
      normal: {
        color: "#13AF82",
      },
    },
    series: [
      {
        data: _data.map(item => item.number),
        type: "bar",
      },
    ],
  };
});

onMounted(() => {
  let myChart = echarts.init(document.getElementById("EchartArticleType"));
  watchEffect(() => {
    myChart.setOption(option.value);
  });
});
</script>
<style scoped lang="scss">
.item {
  height: 15vw;
  width: 33vw;
  margin-top: 1vw;
}
#EchartArticleType {
  width: 100%;
  height: 80%;
}
.btns {
  display: flex;
  .btn {
    width: 10%;
    height: 1vw;
    margin-top: 1vw;
    margin-left: 0.8vw;
    border-radius: 0.2vw;
    color: white;
    font-size: 0.8vw;
    background-color: #034c6a;
    display: flex;
    justify-content: center;
    align-items: center;
    &:nth-child(1) {
      margin-left: 0px !important;
    }
    &:hover {
      background-color: lighten(#034c6a, 10%);
    }
  }
  .active {
    border-bottom: 0.2vw solid #4b8df8;
  }
}
</style>
