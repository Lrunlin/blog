<template>
  <el-row class="option" justify="space-between">
    <el-col :span="12" style="display: flex; align-items: center">
      <span>只看管理员文章:</span>
      <el-switch v-model="option.adminOnly"></el-switch>
      <span>文章类型:</span>
      <Type v-model:type="option.type" v-model:multiple="isMultiple" :key="key" />
      <el-icon style="margin-left: 10px" v-if="option.type" color="red" @click="clearType">
        <circle-close-filled />
      </el-icon>
    </el-col>
    <el-col :span="2">
      <el-button>{{ total }}</el-button>
    </el-col>
  </el-row>
  <el-table :data="tableData" stripe style="width: 100%" row-ke="id">
    <el-table-column label="#" width="40">
      <template v-slot="scope">{{ scope.$index + 1 }}</template>
    </el-table-column>
    <el-table-column prop="title" label="标题" width="180">
      <template v-slot="scope">
        <el-tooltip effect="dark" :content="scope.row.title" placement="top-start">
          <div class="hidden">{{ scope.row.title }}</div>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="author" label="作者" width="180" />
    <el-table-column label="类型" width="380">
      <template v-slot="scope">
        <el-tag
          v-for="(item, index) in scope.row.type"
          :key="index"
          size="mini"
          :style="{ marginLeft: index ? '10px' : '0px' }"
          >{{ item }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="view_count" label="阅读量" width="80" />
    <el-table-column prop="time" label="日期" />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-icon color="#409EFF">
          <edit @click="router.push(`/article/${scope.row.id}`)" />
        </el-icon>
        <el-icon color="red" style="margin-left: 20px" @click="remove(scope)">
          <delete />
        </el-icon>
        <el-icon color="gray" style="margin-left: 20px" @click="download(scope.row.id)">
          <Download />
        </el-icon>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="option.page"
    :hide-on-single-page="true"
    background
    layout="prev, pager, next"
    :total="total"
  ></el-pagination>
</template>
<script setup>
import { ref, watchEffect, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";
import { CircleCloseFilled, Edit, Delete, Download } from "@element-plus/icons";
import Type from "@/components/ArticleType.vue";
import downloadData from "@/utils/download.js";

let router = useRouter();

let isMultiple = false;

let tableData = ref([]);
let option = reactive({
  page: 1,
  adminOnly: false,
  type: "",
});

let total = ref(0);

watchEffect(() => {
  let params = {};
  if (option.adminOnly) {
    params.adminOnly = true;
  }
  if (option.type) {
    params.type = option.type;
  }
  axios.get(`/article/page/${option.page}`, { params: params }).then(res => {
    total.value = res.data.total;
    tableData.value = res.data.data;
  });
});

let key = ref("这是一个Type组件的Key他的作用是改变Key使得组件强制更新");
function clearType() {
  option.type = "";
  key.value = Math.random() + "";
}

function remove(scope) {
  ElMessageBox.confirm(`删除文章:${scope.row.title} ？`, "确定删除此文章？", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    axios.delete(`/article/${scope.row.id}`).then(res => {
      if (res.data.success) {
        ElMessage.success(res.data.message);
        tableData.value.splice(scope.$index, 1);
        total.value--;
      } else {
        ElMessage.error(res.data.message);
      }
    });
  });
}

function download(id) {
  axios.get(`/article/${id}`).then(res => {
    downloadData(res.data.data);
  });
}
</script>
<style scoped lang="scss">
.option {
  margin-bottom: 20px;
  span {
    font-size: 14px;
    margin: 0px 10px;
  }
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.hidden {
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}
.el-icon {
  font-size: 24px;
  cursor: pointer;
}
</style>
