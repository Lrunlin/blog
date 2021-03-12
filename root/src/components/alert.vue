<template>
  <div class="alert">
    <div>
      <i class="el-icon-loading"></i>
      <p>{{ text }}</p>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
defineProps({
  text: String,
});
</script>
<style scoped lang='scss'>
.alert {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgb(0, 0, 0, 0.7);
  text-align: center;
  z-index: 9999999999;
  div{
      height: 100px;
      margin-top: calc((100vh - 100px) / 2);
  }
  i {
    color: blue;
    font-size: 40px !important;
  }
  p{
    color: rgb(255, 255, 255);
      
  }
}
</style>