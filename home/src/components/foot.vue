<template>
  <footer>
    <p class="foot-writer">
      @2021-{{ store.state.name }}的小站-
      <a href="https://beian.miit.gov.cn/" target="_blank"
        >辽ICP备2020014377号-2</a
      >
    </p>
  </footer>
</template>
<script setup>
// import {ref} from 'vue'
import { useStore } from "vuex";
let store = useStore();
</script>
<style scoped lang='scss'>
footer {
  margin-top: 40px;
  height: 50px;
  line-height: 50px;
}
P {
  font-size: 14px;
  color: #666;
  text-align: center;
  a {
    color: #666;
    text-decoration: none;
  }
}
</style>