<template>
  <headCom></headCom>
  <router-view class="main"></router-view>
</template>
<script setup>
// import { ref } from "vue";
import headCom from "@/components/head";
</script>
<style scoped lang='scss'>
.main {
  width: 1200px;
  margin: 0px auto;
}
</style>