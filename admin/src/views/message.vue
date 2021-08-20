<template>
  <header>
    <el-input v-model="message" placeholder="输入保存的词条"></el-input>
    <el-button type="primary" @click="save" :disabled="!test.test(message)"
      >保存</el-button
    >
  </header>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="message" label="词条">
      <template v-slot="scope">
        <el-tooltip effect="dark" :content="scope.row.message" placement="top">
          <div>{{ scope.row.message }}</div>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="删除" width="180">
      <template v-slot="scope">
        <el-button
          round
          type="danger"
          icon="el-icon-delete"
          circle
          @click="remove(scope.row.id, scope.$index)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
let data = ref([]);
let message = ref("");
let test = /^[\s\S]*.*[^\s][\s\S]*$/;
axios.get("/message").then((res) => {
  data.value = res.data.data;
});
function save() {
  axios.post("/message", { message: message.value }).then((res) => {
    if (res.data.success) {
      ElMessage.success("添加成功");
      message.value = "";
    } else {
      ElMessage.error("添加错误");
    }
  });
}
function remove(id, index) {
  axios.delete(`/message/${id}`).then((res) => {
    if (res.data.success) {
      ElMessage.success("删除成功");
      data.value.splice(index, 1);
    } else {
      ElMessage.error("删除失败");
    }
  });
}
</script>
<style scoped lang='scss'>
header {
  margin-top: 20px;
  .el-input {
    width: 70%;
    margin-left: 10px;
  }
  .el-button {
    margin-left: 10px;
  }
}
</style>