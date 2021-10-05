<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="contact" label="联系方式" width="180">
    </el-table-column>
    <el-table-column prop="content" label="留言内容" width="180">
      <template v-slot="scope">
        <el-tooltip
          effect="dark"
          :content="scope.row.content"
          placement="top-start"
        >
          <div class="overflow">{{ scope.row.content }}</div>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
    <el-table-column prop="time" label="日期" width="180"> </el-table-column>
    <el-table-column label="操作" width="180">
      <template v-slot="scope">
        <el-button
          type="primary"
          icon="el-icon-view"
          circle
          @click="viewMessage(scope.row)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="remove(scope.row.id, scope.$index)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="留言展示" v-model="currentDisplay" width="30%">
    <div>
      {{ currentDisplay.contact }}
    </div>
    <div>
      {{ currentDisplay.content }}
    </div>
    <div>
      {{ currentDisplay.time }}
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="currentDisplay = false"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
let currentDisplay = ref(false); //用来展示的信息

let tableData = ref([]);
axios.get("/message").then((res) => {
  tableData.value = res.data.data;
});

function viewMessage(data) {
  currentDisplay.value = data;
}
function remove(id, index) {
  axios.delete(`/message/${id}`).then((res) => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      tableData.value.splice(index, 1);
    } else {
      ElMessage.error(res.data.message);
    }
  });
}
</script>
<style scoped lang='scss'>
.overflow {
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}
</style>