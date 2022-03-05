<template>
  <div class="item">
    <img src="@/assets/analysis/left_top.png" class="left_top" alt="" />
    <img src="@/assets/analysis/right_bottom.png" class="right_bottom" alt="" />
    <div id="EchartsAddress"></div>
  </div>
</template>
<script setup>
/**
 * 父组件传来省份，本组件根据JSON数据获取省会
 * 并且在地图上建立连线，（传来省的省会--所有省会）
 */
import { computed, onMounted, watch } from "vue";
import china from "@/assets/analysis/china.json";
import data from "@/assets/analysis/city-data.json";

import * as echarts from "echarts/core";
import { MapChart, EffectScatterChart, LinesChart } from "echarts/charts";
import { VisualMapComponent, TitleComponent } from "echarts/components";
echarts.use([MapChart, VisualMapComponent, EffectScatterChart, LinesChart, TitleComponent]);
echarts.registerMap("china", china);

let props = defineProps({ address: { type: String, required: true, default: "北京市" } });
let city = computed(() => data[props.address].city); //根据传来的省找到省会

//数据格式化
let geoCoordMap = {}; //城市坐标信息
Object.values(data).forEach(item => {
  geoCoordMap[item.city] = item.cp;
});

//城市之间的连线情况
let LineData = computed(() => {
  let _data = Object.values(data).map(item => [{ name: city.value }, { name: item.city }]);
  return _data;
});
// 将LineData转为Echarts使用的格式
let convertData = function (data) {
  let res = [];
  for (let i = 0; i < data.length; i++) {
    let dataItem = data[i];
    let fromCoord = geoCoordMap[dataItem[0].name];
    let toCoord = geoCoordMap[dataItem[1].name];
    if (fromCoord && toCoord) {
      res.push({
        fromName: dataItem[0].name,
        toName: dataItem[1].name,
        coords: [fromCoord, toCoord],
      });
    }
  }
  return res;
};

let series = computed(() => {
  return [
    {
      name: city.value,
      type: "lines",
      zlevel: 1,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: "#fff",
        symbolSize: 3,
      },
      lineStyle: {
        width: 0,
        curveness: 0.2,
      },
      data: convertData(LineData.value),
    },
    {
      name: city.value,
      type: "lines",
      zlevel: 2,
      symbol: ["none", "arrow"],
      symbolSize: 5,
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbolSize: 5,
      },
      lineStyle: {
        width: 1,
        opacity: 0.6,
        curveness: 0.2,
      },
      data: convertData(LineData.value),
    },
    {
      name: city.value,
      type: "effectScatter",
      coordinateSystem: "geo",
      zlevel: 2,
      rippleEffect: {
        brushType: "stroke",
      },
      label: {
        show: true,
        position: "right",
        //只有主机所在省的省会显示名字
        formatter: function (params) {
          return params.name == city.value ? params.name : "";
        },
      },
      symbolSize: function (val) {
        return val[2] / 8;
      },
      data: LineData.value.map(function (dataItem) {
        return {
          name: dataItem[1].name,
          value: geoCoordMap[dataItem[1].name].concat(1),
        };
      }),
    },
  ];
});

let option = computed(() => {
  return {
    title: {
      text: "服务器位置",
      subtext: "所在省的省会",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    geo: {
      map: "china",
      label: {
        emphasis: {
          show: false,
        },
      },
      zoom: 1, //当前视角的缩放比例
      roam: true, //是否开启平游或缩放
      scaleLimit: {
        //滚轮缩放的极限控制
        min: 1,
        max: 1.8,
      },
      itemStyle: {
        borderColor: "rgba(147, 235, 248, 1)",
        borderWidth: 1,
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: "rgba(175,238,238, 0)",
            },
            {
              offset: 1,
              color: "rgba(	47,79,79, .1)",
            },
          ],
          globalCoord: false,
        },
        shadowColor: "rgba(128, 217, 248, 1)",
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
        emphasis: {
          areaColor: "#389BB7",
          borderWidth: 0,
        },
      },
    },
    series: series.value,
  };
});
onMounted(() => {
  watch(option, newValue => {
    let myChartChina = echarts.init(document.getElementById("EchartsAddress"));
    myChartChina.setOption(newValue);
  });
});
</script>
<style scoped lang="scss">
.item {
  width: 30vw;
}
#EchartsAddress {
  width: 100%;
  height: 100%;
}
</style>
