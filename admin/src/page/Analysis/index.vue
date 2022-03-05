<template>
  <div class="container analysis">
    <Header />
    <main>
      <div class="main-header">
        <Aside
          :article_count="data.article_count"
          :type_count="data.type_count"
          :user_count="data.user_count"
        />

        <div style="margin-left: 1vw">
          <OS
            :os="data.os"
            :memory_total="data.memory_total"
            :memory_free="data.memory_free"
            :time="data.uptime"
          />
          <ArticleType :data="data.statistics" />
        </div>
        <Referrer :data="data.statistics" />
      </div>
      <div class="main-body">
        <Address :address="data.address" />
        <Visits :data="data.statistics" />
        <CPU :data="data.loadavg" />
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";

import Header from "./Header.vue";
import Aside from "./Aside.vue";
import OS from "./OS.vue";
import ArticleType from "./Type.vue";
import Referrer from "./Referrer.vue";
import Address from "./Address.vue";
import Visits from "./Visits.vue";
import CPU from "./CPU.vue";
let data = ref("");
axios.get("/analysis").then(res => {
  data.value = res.data.data;
});
</script>
<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/analysis/bg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  user-select: none;
  // 加速
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
main {
  width: 98vw;
  margin: 0px auto;
  margin-top: 1.2vw;
  .main-header {
    display: flex;
  }
  .main-body {
    display: flex;
    height: 20vw;
    margin-top: 1vw;
  }
}
</style>
<style lang="scss">
.analysis {
  .item {
    padding: 1.1vw 1vw;
    position: relative;
    overflow: hidden;
  }
  .left_top {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 2vw;
  }
  .right_bottom {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 2vw;
  }
}
</style>
