<template>
  <div>
    <el-input placeholder="请输入类型" v-model="type" clearable> </el-input>
    <el-button type="primary" @click="create">添加类型</el-button>
  </div>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="type" label="类型" width="220"> </el-table-column>
    <el-table-column prop="time" label="创建时间" width="280">
    </el-table-column>
    <el-table-column>
      <template v-slot="scope">
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          v-on:click="removeType(scope.row.type, scope.$index)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import createType from "../../modules/type/create-type";
import readType from "../../modules/type/read-type";
import deleteType from "../../modules/type/delete-type";

let router = useRouter();

let type = ref("");
function create() {
  createType({ type: type.value }).then((res) => {
    if (res.res) {
      ElMessage({
        showClose: true,
        message: `成功添加文章类型：${type.value}`,
        type: "success",
        duration: 2000,
      });
      router.go(0);
    } else {
      ElMessage({
        showClose: true,
        message: "添加失败",
        type: "error",
      });
    }
  });
}
let tableData = ref("");
readType().then((res) => {
  tableData.value = res.data;
});

function removeType(type, index) {
  deleteType({ type: type }).then((res) => {
    if (res.res) {
      ElMessage.success({
        message: `成功删除文章类型： ${type} `,
        duration: 2000,
      });
      tableData.value.splice(index, 1);
    } else {
      ElMessage.error({
        message: `删除失败 `,
      });
    }
  });
}
</script>
<style scoped lang='scss'>
div {
  margin-top: 20px;
  margin-left: 30px;
}
.el-input {
  width: 400px;
}
.el-button {
  margin-left: 30px;
}
</style>