<template>
  <el-table :data="store.state.article.activeArticle" style="width: 100%">
    <el-table-column label="路由" width="180">
      <template v-slot="scope">
        <div class="title">
          <el-tooltip :content="scope.row.router" placement="top">
            <span>{{ scope.row.router }}</span>
          </el-tooltip>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="标题" width="180">
      <template v-slot="scope">
        <div class="title">
          <el-tooltip :content="scope.row.title" placement="top">
            <span>{{ scope.row.title }}</span>
          </el-tooltip>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="类型" width="300">
      <template v-slot="scope">
        <el-tag
          v-for="(item, index) in scope.row.type"
          :style="{ marginLeft: index != 0 ? '10px' : '0px' }"
          :key="item.key"
          size="small"
          >{{ item }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column label="显示" width="50">
      <template v-slot="scope">
        <el-icon :size="20" color="green" v-if="scope.row.isShow">
          <check />
        </el-icon>
        <el-icon :size="20" color="red" v-else>
          <close />
        </el-icon>
      </template>
    </el-table-column>
    <el-table-column label="推荐" width="50">
      <template v-slot="scope">
        <el-icon :size="20" color="green" v-if="scope.row.isTop">
          <check />
        </el-icon>
        <el-icon :size="20" color="red" v-else>
          <close />
        </el-icon>
      </template>
    </el-table-column>
    <el-table-column label="操作" wdith="auto" headerAlign="center">
      <template v-slot="scope">
        <div class="tools">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="
              router.push({
                path: '/updata-article',
                query: { router: scope.row.router },
              })
            "
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-view"
            circle
            @click="overview(scope.row.router)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="remove(scope.row.router)"
          ></el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev,pager,next,jumper"
    v-model:currentPage="page"
    :total="store.state.article.max"
  />
  <el-dialog title="预览文章" v-model="isOverviewActive">
    <el-form label-width="80px">
      <el-form-item label="路由:">
        <div class="overview_text">
          {{ overviewArticleData.router }}
        </div>
      </el-form-item>
      <el-form-item label="标题:">
        <div class="overview_text">
          {{ overviewArticleData.title }}
        </div>
      </el-form-item>
      <el-form-item label="创建时间:">
        <el-date-picker
          v-model="overviewArticleData.time"
          :readonly="true"
          type="date"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="介绍:">
        <div class="overview_text">
          {{ overviewArticleData.introduce }}
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isOverviewActive = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            router.push({
              path: '/updata-article',
              query: { router: overviewArticleData.router },
            })
          "
          >修改</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-dialog
    :title="`确认删除文章:${deleteArticleActive}？`"
    v-model="deleteArticleActive"
    width="30%"
  >
    <span>删除后无法恢复</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteArticleActive = false">取 消</el-button>
        <el-button type="primary" @click="deleteArticle">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { Check, Close } from "@element-plus/icons";
import axios from "axios";
import deleteImage from "@/modules/deleteImage";

const store = useStore();
const route = useRoute();
const router = useRouter();

let page = ref(0);

/*
todo 页码切换相关操作
? 切换页面时检测状态是否存储在store中如果没有就请求后存入store
! tableData使用计算属性会在ajax请求后加载数据有一点卡顿(不要使用watchEffect和computed)
*/
watch(page, (newValue, oldValue) => {
  if (store.state.article.articleData[newValue]) {
    store.commit("switchPage", newValue);
  } else {
    store.dispatch("setPageArticleData", newValue);
  }
  router.push({ query: { page: newValue } });
});
page.value = +route.query.page || 1;

/*
todo 点击概览察看基本数据
*/
let isOverviewActive = ref(false); //悬浮是否显示
let overviewArticleData = ref({}); //展示的数据
function overview(router) {
  store.commit("findArticle", router);
  overviewArticleData.value = store.state.article.overviewArticle;
  isOverviewActive.value = true;
}

/*
todo 删除文章
@param deleteArticleActive 删除文章的悬浮窗是否显示
存储准备删除的router和index（router/false）
*/
let deleteArticleActive = ref(false);
function remove(router) {
  deleteArticleActive.value = router;
}

function deleteArticle() {
  store.commit("findArticle", deleteArticleActive.value);
  axios.delete(`/article/${deleteArticleActive.value}`).then((res) => {
    if (res.data.success) {
      store.commit("removeArticle", {
        page: page.value,
        router: deleteArticleActive.value,
      });
      deleteArticleActive.value = false;
      ElMessage.success({
        showClose: true,
        message: "删除成功",
        duration: 2000,
      });
      deleteImage(store.state.article.overviewArticle.article);
    } else {
      ElMessage.error({
        showClose: true,
        message: "删除失败",
        duration: 2000,
      });
      deleteArticleActive.value = false;
    }
  });
}
</script>
<style scoped lang='scss'>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tools {
  display: flex;
  justify-content: center;
}
.el-pagination {
  text-align: center;
  margin-top: 40px;
}
</style>