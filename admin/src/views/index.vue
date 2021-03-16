<template>
  <navigation></navigation>
  <router-view></router-view>
  <div v-if="show" class="show">
    <div class="show-box">
      <i class="el-icon-loading"></i>
      <p>正在进行二次验证，请等待</p>
    </div>
  </div>
</template>
<script setup>
import navigation from "@/components/navigation.vue";
import { useRouter } from "vue-router";
import lognIn from "@/modules/function/logn";
import { ref } from "vue";
let show = ref(true);

let router = useRouter();
if (document.cookie.indexOf("admin=") == -1) {
  alert("系统在beta版本期间不强制登录");
  // router.replace("logn");
} else {
  // 获取cookie进行二次验证
  const cookies = document.cookie.split(";");
  cookies.forEach((el, i) => {
    if (el.indexOf("admin=") != -1) {
      let data = JSON.parse(el.substring(7));
      lognIn({ admin: data.admin, password: data.password })
        .then((res) => {
          if (res.res) {
            show.value = false;
          } else {
            alert("怀疑您伪造cookie请您重新登录");
            // router.replace("logn");
          }
        })
        .catch((code) => {
          alert("网络请求错误");
          // router.replace("logn");
        });
    }
  });
}
</script>
<style scoped lang='scss'>
body::-webkit-scrollbar {
  display: none;
}
body {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.show {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgb(0, 0, 0, 0.6);
  z-index: 9999999999 !important;
  color: blue;
  text-align: center;
  i {
    font-size: 50px;
  }
}
.show-box {
  height: 100px;
  margin-top: calc((100vh - 100px) / 2);
}
</style>