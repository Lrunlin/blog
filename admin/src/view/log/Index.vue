<template>
  <el-button type="danger" @click="dialogVisible = true">清空日志</el-button>

  <el-table
    :data="tableData"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    :tree-props="{ children: 'data' }"
    @expandChange="childLoad"
  >
    <el-table-column label="日期" width="140">
      <template v-slot="scope">
        <span>
          {{ scope.row.date }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="ip" label="IP" width="180" />
    <el-table-column prop="path" label="请求路径" width="150" />
    <el-table-column prop="method" label="请求方式" width="80" />
    <el-table-column prop="responseTime" label="响应时间" width="100" />
    <el-table-column prop="time" label="发起时间" sortable width="180" />
    <el-table-column label="删除">
      <template v-slot="scope">
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          v-if="scope.row.date"
          @click="remove(scope.row)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="确定清空日志？" width="30%">
    <h2 style="color: red; font-weight: 700">
      这将使你的日志无法恢复，请谨慎操作
    </h2>
    <el-input v-model="userCode" placeholder="验证码" />
    <el-input v-model="code" disabled />
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="logClear"
          type="danger"
          :title="
            code != userCode
              ? '您的可以通过控制台取消disabled属性,这个功能只是给你更多的考虑时间'
              : ''
          "
          :disabled="code != userCode"
          >确定清空</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
let tableData = ref([]);
let data;
axios.get("/log").then((res) => {
  data = JSON.parse(JSON.stringify(res.data.data)); //?防止指向同一块内存
  tableData.value = res.data.data.map((item) => {
    item.data = [{}];
    return item;
  });
});
// todo 因为日志的条数可能比较多，但是又不想分页所以只加载展开日期的日志，收起后删除
function childLoad(row, expandedRows) {
  if (expandedRows) {
    //展开
    let index = tableData.value.findIndex((item) => item.date == row.date);
    tableData.value[index].data = data[index].data;
  } else {
    let index = tableData.value.findIndex((item) => item.date == row.date);
    tableData.value[index].data = [{}];
  }
}

function remove(data) {
  let url = `/date/${data.date}`;
  axios.delete("/log" + url).then((res) => {
    if (res.data.success) {
      tableData.value.splice(+data.id, 1);
      ElMessage.success(res.data.message);
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

let dialogVisible = ref(false);
let code = ref((Math.random() + "").toString(32).substring(3, 7));
let userCode = ref("");
function logClear() {
  axios.delete("/log/clear").then((res) => {
    ElMessage.success(res.data.message);
    dialogVisible.value = false;
  });
}
</script>
<style scoped lang='scss'>
.el-input {
  width: 100px;
  margin: {
    top: 10px;
    left: 10px;
  }
}
</style>