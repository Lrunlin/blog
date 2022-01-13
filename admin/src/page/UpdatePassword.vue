<template>
  <el-input v-model="password" placeholder="填写密码" clearable />
  <el-input v-model="isPassword" placeholder="确认密码" clearable />
  <el-popconfirm :title="`确认将密码修改为: ${password}?`" @confirm="update">
    <template #reference>
      <el-button type="primary" :disabled="isDisabled">确认修改</el-button>
    </template>
  </el-popconfirm>
</template>
<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

let router = useRouter();

let password = ref("");
let isPassword = ref("");

let isDisabled = computed(() => {
  return !/^[\s\S]*.*[^\s][\s\S]*$/.test(password.value) || password.value != isPassword.value;
});

function update() {
  axios.put("/admin", { password: password.value }).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      localStorage.removeItem("token");
      router.replace("/sign");
    } else {
      ElMessage.error(res.data.message);
    }
  });
}
</script>
<style scoped lang="scss">
.el-input,
.el-button {
  width: 400px;
  display: block;
  margin: 0px auto;
  margin-top: 10px;
}
</style>
