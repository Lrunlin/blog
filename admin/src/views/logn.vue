<template>
  <div class="logn">
    <div class="logn-box">
      <el-input v-model="admin" placeholder="请输入管理员账号"></el-input>
      <el-input v-model="password" placeholder="请输入管理员密码"></el-input>
      <el-button type="primary" @click="logn">主要按钮</el-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import lognIn from "@/modules/function/logn";
let admin = ref("");
let password = ref("");
let test = /^[\s\S]*.*[^\s][\s\S]*$/;
function logn() {
  if (test.test(admin.value) && test.test(password.value)) {
    lognIn({ admin: admin.value, password: password.value }).then((res) => {
      console.log(res);
    });
  } else {
    ElMessage({
      message: "请将账号密码填写完整",
      type: "error",
    });
  }
}
</script>
<style scoped lang='scss'>
$width:300px;
.logn {
  widows: 100vw;
  height: 100vh;
  background-image: linear-gradient(to bottom, #13abff, #73ceff);
}
.logn-box {
  width: 400px;
  height: 280px;
  background: white;
  border-radius: 10px;
  margin: 0px auto;
  position: relative;
  top: 40px;
  text-align: center;
  .el-input {
    width: $width;
    margin-top: 30px;
  }
  .el-button {
    display: block !important;
    width: $width !important;
    margin: 0px auto;
    margin-top: 30px;
  }
}
</style>