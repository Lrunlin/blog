<template>
  <el-row>
    <Nav />
    <div style="width: 100%; margin-top: 10px">
      <!-- <History /> -->
      <el-skeleton :rows="5" animated v-if="isLoad" />
      <router-view v-if="state"></router-view>
      <div v-else="state" style="text-align: center; margin-top: 30px">
        <el-button type="primary" @click="router.replace('/sign')">去登录</el-button>
      </div>
    </div>
  </el-row>
</template>
<script setup>
import Nav from "@/components/Nav.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import History from "@/components/HistoryTag.vue";
import axios from "axios";

let router = useRouter();
let store = useStore();
let state = ref(false);
let isLoad = ref(true);

axios
  .get("/admin/state")
  .then(res => {
    state.value = res.data.success;
  })
  .finally(() => {
    isLoad.value = false;
  });
</script>
