<template>
  <router-view></router-view>
  <div class="mask_layer" @click.stop="" v-show="store.state.isLoad">
    <el-icon>
      <loading class="ico_load" />
    </el-icon>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Loading } from "@element-plus/icons";
let store = useStore();
let router = useRouter();
router.afterEach((to, from, next) => {
  if (to?.meta?.title) {
    document.title = to.meta.title;
  }
});
</script>
<style lang='scss'>
* {
  margin: 0px;
  padding: 0px;
}
body {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
body::-webkit-scrollbar {
  display: none;
}
.mask_layer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999999;
  user-select: none;
  text-align: center;
  line-height: 100vh;
  .ico_load {
    width: 4em;
    height: 4em;
    color: white;
    animation: ico_rotate 3s infinite;
    animation-timing-function: linear;
    transform: rotate(0deg);
  }
}
@keyframes ico_rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>