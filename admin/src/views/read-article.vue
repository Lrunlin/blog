<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column label="网站路由" width="180">
      <template v-slot="scope">
        <router-link :to="`/updata-article?router=${scope.row.router}`">
          {{ scope.row.router }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column label="文章标题">
      <template v-slot="scope">
        <el-tooltip
          class="item"
          effect="dark"
          :content="scope.row.title"
          placement="top"
        >
          <div class="title">{{ scope.row.title }}</div>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="文章类型"> </el-table-column>
    <el-table-column label="删除文章">
      <template v-slot="scope">
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="
            beforeRemove(scope.row.router, scope.$index, scope.row.article)
          "
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="max"
    @current-change="switchPage($event)"
  />
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";
import deleteImage from "@/modules/deleteImage";
let data = ref([]);
axios.get("/article-page/1").then((res) => {
  data.value = res.data.data;
});

let max = ref(0);
axios.get("/article-max").then((res) => {
  max.value = res.data.data;
});

function switchPage(page) {
  axios
    .get("/article-page/" + page, {
      params: { key: "router,type,article,title" },
    })
    .then((res) => {
      data.value = res.data.data;
    });
}

function beforeRemove(router, index, html) {
  ElMessageBox.confirm(`确认删除本文章？路由:${router}`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      axios.delete(`/article/${router}`).then((res) => {
        if (res.data.success) {
          deleteImage(html);
          data.value.splice(index, 1);
          ElMessage.success("删除成功");
        }
      });
    })
    .catch((res) => {});
}
</script>
<style scoped lang='scss'>
a {
  color: black;
}
.title {
  width: 120px;
  height: 20px;
  word-wrap: break-word;
  word-break: break-all;
  text-overflow: ellipsis;
}
.el-pagination {
  text-align: center;
  margin: 30px 0px;
}
</style>