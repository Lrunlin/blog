<template>
  <div class="container">
    <div class="form">
      <h2>刘润霖博客管理系统</h2>
      <div class="form_item">
        <User class="form_icon" />
        <input type="text" v-model="form.admin" class="form_input" />
      </div>
      <div class="form_item">
        <Key class="form_icon" />
        <input type="text" v-model="form.password" class="form_input" />
      </div>
      <button class="form_btn" @click="sign">登录</button>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";
import { User, Key } from "@element-plus/icons";
let router = useRouter();

let form = reactive({
  admin: "",
  password: "",
});

function sign() {
  axios.get("/admin", { params: { ...form } }).then((res) => {
    console.log(res.data);
    if (res.data.success) {
      ElMessage({
        message: "登录成功",
        type: "success",
      });
      console.log(res.data);
      localStorage.token = res.data.token;
      router.replace("/");
    } else {
      ElMessage({
        message: "账号或密码错误",
        type: "error",
      });
    }
  });
}
</script>
<style scoped lang='scss'>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/bg.jpg");
  background-size: 100% 100%;
}
.form {
  position: relative;
  top: 100px;
  width: 300px;
  text-align: center;
  border-radius: 10px;
  margin: 0px auto;
  padding: 30px 50px;
  background: rgb(0, 0, 0, 0.3);
  h2 {
    margin-bottom: 10px;
    color: rgb(230, 230, 230);
    font-size: 20px;
  }
  .form_item {
    margin-top: 10px;
    .form_icon {
      width: 1em;
      height: 1em;
      color: white;
    }
    .form_input {
      margin-left: 10px;
      border: 0px;
      border-bottom: 1px solid black;
      background: none;
      color: white;
      outline: none !important;
      &:hover {
        border-bottom: 1px solid white;
      }
      &:-internal-autofill-selected {
        background-color: none !important;
      }
    }
  }
  .form_btn {
    width: 145px;
    height: 25px;
    border-radius: 25px;
    margin: 0 auto;
    margin-top: 25px;
    cursor: pointer;
    background: linear-gradient(120deg, #a6c0fe, #f68084);
    border: 0px;
    &:active {
      box-shadow: #f68084 0px 0px 10px;
    }
  }
}
</style>
