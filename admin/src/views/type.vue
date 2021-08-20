<template>
  <header>
    <el-input v-model="type" placeholder="输入类型"></el-input>
    <el-button type="primary" @click="save" :disabled="!test.test(type)"
      >保存</el-button
    >
  </header>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="type" label="类型"> </el-table-column>
    <el-table-column label="删除" width="180">
      <template v-slot="scope">
        <el-button
          round
          type="danger"
          icon="el-icon-delete"
          circle
          @click="remove(scope.row.type, scope.$index)"
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
let type = ref("");
let test = /^[\s\S]*.*[^\s][\s\S]*$/;
axios.get("/type").then((res) => {
  data.value = res.data.data;
  console.log(data.value);
});
function save() {
  axios.post("/type", { type: type.value }).then((res) => {
    if (res.data.success) {
      ElMessage.success("添加成功");
      type.value = "";
    } else {
      ElMessage.error("添加错误");
    }
  });
}
function remove(type, index) {
  axios.delete(`/type/${type}`).then((res) => {
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