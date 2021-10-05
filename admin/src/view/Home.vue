<template>
  <Nav />
  <div class="container" v-if="token">
    <router-view></router-view>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Nav from "@/components/Nav.vue";
import axios from "axios";
import { useRouter } from "vue-router";
let router = useRouter();
let token = ref(true);
</script>
<style scoped lang='scss'>
.container {
  padding-bottom: 30px;
}
</style>