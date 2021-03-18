<template>
  <div class="head-box">
    <div class="box">
      <router-link to="/">首页</router-link>
      <router-link to="/">文章</router-link>
      <router-link to="/">分类</router-link>
      <router-link to="/">关于</router-link>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
</script>
<style scoped lang='scss'>
.head-box {
  width: 100vw;
  height: 44px;
  line-height: 44px;
  background: black;
  .box {
    max-width: 1200px;
    display: flex;
    a {
      color: white;
      text-decoration: none;
      width: 80px;
      text-align: center;
    }
  }
}
</style>