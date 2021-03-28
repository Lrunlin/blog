<template>
  <headCom></headCom>
  <router-view></router-view>
  <footCom></footCom>
  <el-backtop class=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
</template>



<script setup>
import { onUnmounted } from "vue";
import headCom from "@/components/head";
import footCom from "@/components/foot";
document.body.style.paddingLeft = "320px";
onUnmounted(() => {
  document.body.style.paddingLeft = "0px";
});




let style = ["color:red", "font-size:30px"].join(";");
console.log(
  "%c本人有偿代写：html,css,js,jQuery，vue，node,mysql,毕业设计，作业，公司小项目，可添加QQ：1974102227，微信：webzhizuo",
  style
);
</script>
<style scoped lang='scss'>
</style>