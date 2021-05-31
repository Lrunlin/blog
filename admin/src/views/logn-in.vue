<template>
  <div class="container">
    <div class="box">
      <h2>登录</h2>
      <div class="input-item">
        <i class="el-icon-user"></i>
        <input
          type="text"
          autocomplete="off"
          placeholder="用户名"
          v-model="admin"
        />
      </div>
      <div class="input-item">
        <i class="el-icon-unlock"></i>
        <input
          type="password"
          autocomplete="off"
          placeholder="密码"
          v-model="password"
        />
      </div>
      <div class="btn" @click="lognIn">登录</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { Base64 } from "js-base64";
import { ElMessage } from "element-plus";

let router = useRouter();
let admin = ref("");
let password = ref("");
function lognIn() {
  axios
    .post(`/logn-in`, { admin: admin.value, password: password.value })
    .then((res) => {
      if (res.data.success) {
        let cookieAdmin = Base64.encode(admin.value + "刘润霖");
        let cookiePassword = Base64.encode(password.value + "刘润霖");
        // vue3Cookie.set("admin", cookieAdmin);
        // vue3Cookie.set("password", cookiePassword);
        router.resolve("/");
      } else {
        ElMessage.error("账号或密码输入错误");
      }
    });
}
</script>
<style scoped lang='scss'>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/bg.jpg");
}
.box {
  width: 500px;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  margin: 0px auto;
  position: relative;
  top: 50px;
  text-align: center;
  padding-top: 30px;
  h2 {
    color: white;
    text-align: center;
    margin: 0px;
  }
  .input-item {
    margin-top: 20px;
    i {
      font-size: 18px;
      color: white;
    }
    input {
      background: none;
      border: 0px;
      border-bottom: 1px solid gray;
      color: white;
      outline: none;
      user-select: none;
      width: 200px;
    }
  }
  .btn {
    width: 145px;
    height: 25px;
    border-radius: 25px;
    margin: 0px auto;
    margin-top: 25px;
    color: white;
    cursor: pointer;
    background: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  }
}
</style>