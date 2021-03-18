<template>
  <div id="html" v-html="html" v-show="false"></div>
  <el-select v-model="select" placeholder="请选择" @change="changeSelect">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="router" label="路由" width="120">
      <template v-slot="scope">
        <router-link
          :to="{ path: '/update-article', query: { router: scope.row.router } }"
        >
          {{ scope.row.router }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" width="180"> </el-table-column>
    <el-table-column label="标题" width="220">
      <template v-slot="scope">
        <el-tooltip
          class="item"
          effect="dark"
          :content="Base64.decode(scope.row.title)"
          placement="top"
        >
          <p class="introduceTitle">{{ Base64.decode(scope.row.title) }}</p>
        </el-tooltip>
      </template>
    </el-table-column>

    <el-table-column label="置顶" width="80">
      <template v-slot="scope">
        <span>{{ scope.row.isTop ? "是" : "否" }}</span>
      </template>
    </el-table-column>
    <el-table-column label="展示" width="80">
      <template v-slot="scope">
        <span>{{ scope.row.isShow ? "是" : "否" }}</span>
      </template>
    </el-table-column>

    <el-table-column label="时间" width="130">
      <template v-slot="scope">
        <span>{{ scope.row.time.substring(0, 11) }}</span>
      </template>
    </el-table-column>

    <el-table-column label="删除">
      <template v-slot="scope">
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="isRemove(scope.row.router, scope.$index, scope.row.type)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="确认删除" v-model="dialogVisible" width="30%">
    <span>确认删除关于{{ articleType }}的文章，</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="remove()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { Base64 } from "js-base64";

import readArticle from "@/modules/article/read-article";
import deleteArticleSelectRouter from "@/modules/article/delete-article-selectRouter";
import deleteArticle from "@/modules/article/delete-article";
import deleteAssets from "@/modules/article/delete-assets";
let store = useStore();
let select = ref("desc");
let options = ref([
  {
    value: "desc",
    label: "时间正序(新的在前)",
  },
  {
    value: "ASC",
    label: "时间倒序（新的在后）",
  },
]);
let tableData = ref([]);
readArticle({ time: select.value, index: 0 }).then((res) => {
  tableData.value = res.data;
});

function changeSelect() {
  readArticle({ time: select.value, index: 0 }).then((res) => {
    tableData.value = res.data;
  });
}
let html = ref("");
let articleType = ref("");
let dialogVisible = ref(false);
let articleRouter;
let articleIndex;
function isRemove(router, index, type) {
  // 删除功能要多做，请求对应的HTML，获取资源，删除资源，删除数据库
  deleteArticleSelectRouter({ router: router }).then((res) => {
    html.value = Base64.decode(res.data);
    dialogVisible.value = true;
    articleType.value = type;
    articleIndex = index;
    articleRouter = router;
  });
}
function remove() {
  let images = document.querySelectorAll("#html img");
  dialogVisible.value = false;
  let assets = store.state.assets + "image/";
  let arr = [];
  for (let i = 0; i < images.length; i++) {
    let el = images[i];
    let dataSrc = el.getAttribute("data-src");
    let src = dataSrc.replace(assets, "");
    arr.push(src);
  }

  deleteArticle({ router: articleRouter }).then((res) => {
    if (res.res) {
      let api = store.state.assetsapi;
      if (arr.length) {
        deleteAssets({ api: api, images: arr }).then((res) => {
          ElMessage.success({
            message: "删除成功",
          });
          tableData.value.splice(articleIndex, 1);
        });
      } else {
        ElMessage.success({
          message: "删除成功",
        });
        tableData.value.splice(articleIndex, 1);
      }
    } else {
      ElMessage.error({
        message: "删除失败",
      });
    }
  });
}
</script>
<style scoped lang='scss'>
.el-select {
  margin-top: 30px;
  margin-left: 20px;
}
.introduceTitle {
  width: 180px;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-button {
  margin-left: 20px;
}
a {
  text-decoration: none;
  color: black;
}
</style>