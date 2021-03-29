<template>
  <headCom></headCom>
  <router-view v-cloak></router-view>
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
</script>
<style scoped lang='scss'>

[v-cloak] {
    display: none !important;
}
</style>