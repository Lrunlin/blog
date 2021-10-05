<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="配置介绍" width="180">
      <template v-slot="scope">
        <el-tooltip
          effect="dark"
          :content="scope.row.option"
          placement="top-start"
        >
          <div class="overflow">{{ scope.row.option }}</div>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="进度" width="180">
      <template v-slot="scope">
        {{ scope.row.current }}/{{ scope.row.total }}
      </template>
    </el-table-column>
    <el-table-column label="下载">
      <template v-slot="scope">
        <span @click="download(scope.row.download)" v-if="scope.row.finish"
          >下载</span
        >
        <span v-else>未完成</span>
      </template>
    </el-table-column>
    <el-table-column label="删除">
      <template v-slot="scope">
        <el-button
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
import { ref,useAttrs } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

let tableData = ref([]);

axios.get("/spider").then((res) => {
  tableData.value = res.data.data;
});

async function download(value) {
  let response = await axios("/cors", {
    params: { url: axios.defaults.baseURL + value },
  });
  let blob = new Blob([JSON.stringify(response.data.data)]);
  let objectUrl = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = objectUrl;
  a.download = `download_${+new Date()}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => document.body.removeChild(a), 1000);
}

function remove(id, index) {
  axios.delete("/spider", { params: { id: id } }).then((res) => {
    if (res.data.success) {
      ElMessage.success("删除成功");
      tableData.value.splice(index, 1);
    } else {
      ElMessage.error("删除失败");
    }
  });
}
</script>
<style scoped lang='scss'>
.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>