<template>
  <el-row>
    <Nav />
    <div style="width: 100%; margin-top: 10px">
      <el-skeleton :rows="5" animated v-if="isLoad" />
      <router-view v-if="state"></router-view>
      <div v-else="state" style="text-align: center; margin-top: 30px">
        <el-button type="primary" @click="router.replace('/sign')">去登录</el-button>
      </div>
    </div>
  </el-row>
  <WaterMark v-if="isWaterMark" :text="['blogweb.cn',store.state.admin]" />
</template>
<script setup>
import Nav from "@/components/Nav.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import WaterMark from "@/components/WaterMark.vue";
let router = useRouter();
let store = useStore();
let state = ref(false);
let isLoad = ref(true);

axios
  .get("/admin/state")
  .then(res => {
    if (res.data.success) {
      state.value = res.data.success;
      store.commit("sign", res.data.data);
    }
  })
  .finally(() => {
    isLoad.value = false;
  });
let isWaterMark = computed(() => window.location.hostname != "admin.blogweb.cn");
</script>
