<template>
  <header>
    <span @click="router.back()">博客数据分析</span>
  </header>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
</script>
<style scoped lang="scss">
header {
  width: 100%;
  height:4.4vw;
  background: url("../../assets/analysis/header_bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  user-select: none;
  span {
    color: #fff;
    font-weight: 700;
    font-size: 2vw;
    margin-left: 10vw;
  }
}
</style>
