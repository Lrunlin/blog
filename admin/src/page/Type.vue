<template>
  <div class="type-header">
    <el-button type="primary" @click="mode = 'create'">添加</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="type" label="类型" width="180" />
    <el-table-column label="是否显示" width="180">
      <template v-slot="scope">
        <el-icon size="22" color="green" v-if="scope.row.isShow">
          <Check />
        </el-icon>
        <el-icon size="22" color="red" v-else>
          <Close />
        </el-icon>
      </template>
    </el-table-column>

    <el-table-column label="是否显示" width="180">
      <template v-slot="scope">
        <img :src="`${url}/image/type/${scope.row.type}.webp`" />
      </template>
    </el-table-column>

    <el-table-column prop="time" label="创建时间">
      <template v-slot="scope">
        <el-date-picker
          :readonly="true"
          v-model="scope.row.time"
          type="datetime"
          placeholder="修改发布时间"
        ></el-date-picker>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button
          type="primary"
          size="small"
          @click="
            mode = 'update';
            activeTypeData = tableData[scope.$index];
          "
          >修改</el-button
        >
        <el-button type="danger" size="small" @click="remove(scope.row.type, scope.$index)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <ArticleTypeDialog v-model:mode="mode" v-model:data="activeTypeData" />
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { Close, Check } from "@element-plus/icons";
import { useRouter } from "vue-router";
import ArticleTypeDialog from "@/components/ArticleTypeDialog.vue";
let url = axios.defaults.baseURL;

let router = useRouter();
let tableData = ref([]);
let activeTypeData = ref({});
let mode = ref(false);

axios.get("/type").then(res => {
  tableData.value = res.data.data;
});

function remove(type, index) {
  axios.delete(`/type/${type}`).then(res => {
    if (res.data.success) {
      ElMessage.success("删除成功");
      tableData.value.splice(index, 1);
    } else {
      ElMessage.error("删除失败");
    }
  });
}
</script>

<style scoped lang="scss">
.type-header {
  display: flex;
  justify-content: flex-end;
  padding: 10px 30px;
}
</style>
