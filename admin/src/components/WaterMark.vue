<template></template>
<script setup>
import { ref, onUnmounted } from "vue";
// 挂载到body所以不需要onMounted
// https://segmentfault.com/a/1190000022055867

// 配置
//挂载到body所以不需要onMounted
let id = "blogweb.cn-watermark";
if (document.getElementById(id) !== null) {
  document.body.removeChild(document.getElementById(id));
}

let can = document.createElement("canvas");
// 设置canvas画布大小
can.width = 150;
can.height = 80;

let cans = can.getContext("2d");
cans.rotate((-20 * Math.PI) / 180); // 水印旋转角度
cans.font = "15px Vedana";
cans.fillStyle = "#666666";
cans.textAlign = "center";
cans.textBaseline = "Middle";
//文字
cans.fillText("blogweb.cn", can.width / 2, can.height); // 水印在画布的位置x，y轴
cans.fillText("blog", can.width / 2, can.height + 22);

let div = document.createElement("div");
div.id = id;
div.style.pointerEvents = "none";
div.style.top = "40px";
div.style.left = "0px";
div.style.opacity = "0.20";
div.style.position = "fixed";
div.style.zIndex = "100000";
div.style.width = document.documentElement.clientWidth + "px";
div.style.height = document.documentElement.clientHeight + "px";
div.style.background = "url(" + can.toDataURL("image/png") + ") left top repeat";
document.body.appendChild(div);

onUnmounted(() => {
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }
});
</script>
<style scoped lang="scss"></style>
