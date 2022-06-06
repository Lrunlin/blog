<template></template>
<script setup>
import { onUnmounted, watch } from "vue";

const props = defineProps({
  text: {
    type: Array,
    default: ["blogweb.cn", "blog"],
  },
});

// 挂载到body所以不需要onMounted
// https://segmentfault.com/a/1190000022055867

// 配置
let id = "blogweb.cn-watermark";
if (document.getElementById(id) !== null) {
  document.body.removeChild(document.getElementById(id));
}

function waterMarkDomData() {
  let can = document.createElement("canvas");
  // 设置canvas画布大小
  can.width = 250;
  can.height = 180;

  let cans = can.getContext("2d");
  cans.rotate((-20 * Math.PI) / 180); // 水印旋转角度
  cans.font = "15px Vedana";
  cans.fillStyle = "#666666";
  cans.textAlign = "center";
  cans.textBaseline = "Middle";

  //书写文字
  props.text.forEach((item, index) => {
    cans.fillText(item, can.width / 2, can.height + 22 * index); // 水印在画布的位置x，y轴
  });
  let div = document.createElement("div");
  div.id = id;
  div.style.pointerEvents = "none";
  div.style.top = "0px";
  div.style.left = "0px";
  // 水印透明度
  div.style.opacity = "0.20";
  div.style.position = "fixed";
  div.style.zIndex = "100000 !important";
  div.style.width = document.documentElement.clientWidth + "px";
  div.style.height = document.documentElement.clientHeight + "px";
  div.style.background = "url(" + can.toDataURL("image/png") + ") left top repeat";
  return div;
}

watch(props, () => {
  if (document.getElementById(id)) {
    document.getElementById(id).remove();
  }
  document.body.appendChild(waterMarkDomData());
});
document.body.appendChild(waterMarkDomData());

onUnmounted(() => {
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }
});
</script>
<style scoped lang="scss">
</style>
