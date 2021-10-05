<template>
  <el-form label-width="80px">
    <el-form-item label="添加类型">
      <el-input v-model="type" placeholder="填写文章类型"></el-input>
      <el-button type="primary" @click="create">添加</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="store.state.type.typeData" style="width: 100%">
    <el-table-column label="类型">
      <template v-slot="scope">
        <el-tooltip
          effect="dark"
          :content="`添加时间:${scope.row.time}`"
          placement="top"
        >
          <span> {{ scope.row.type }} </span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="删除">
      <template v-slot="scope">
        <el-button
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
import { useStore } from "vuex";
import axios from 'axios';
import { ElMessage } from "element-plus";
let store = useStore();
if (!store.state.type.typeData.length) {
  store.dispatch("getType");
}

let type = ref("");
function create() {
  if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(type.value)) {
    ElMessage.error("请将内容填写完整");
    return false;
  }

  axios.post("/type", { type: type.value }).then((res) => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      store.commit("addType", type.value);
      type.value = "";
    } else {
      ElMessage.error(res.data.message);
    }
  });
}
function remove(type, index) {
  axios.delete(`/type/${type}`).then((res) => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      store.commit("removeType", index);
    } else {
      ElMessage.error(res.data.message);
    }
  });
}
</script>
<style scoped lang='scss'>
.el-form {
  margin-top: 20px;
  .el-input {
    width: calc(100% - 200px);
  }
  .el-button {
    margin-left: 20px;
  }
}
</style>