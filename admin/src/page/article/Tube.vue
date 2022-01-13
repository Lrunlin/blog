<template>
  <div class="header">
    <el-button title="导出数据库内管理员发布的全部文章" @click="download"
      >导出数据库内全部文章</el-button
    >
  </div>
  <div v-if="tableData.length">
    <el-button title="导入JSON文件中的全部文章信息" @click="allCreate">导入全部</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column label="文章类型">
        <template v-slot="scope">
          <Type v-model:type="scope.row.type" />
        </template>
      </el-table-column>
      <el-table-column label="预览">
        <template v-slot="scope">
          <el-button
            type="primary"
            @click="activeData = { show: true, title: scope.row.title, content: scope.row.content }"
            >预览</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="导入">
        <template v-slot="scope">
          <el-button type="primary" @click="create(scope.row, scope.$index)">导入</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-result v-else icon="info" title="上传JSON" sub-title="上传一个导出或抓取的JSON数据以创建文章">
    <template #extra>
      <input type="file" id="file" @change="readJSON" accept=".json" style="display: none" />
      <label for="file" class="el-button">上传</label>
    </template>
  </el-result>

  <el-dialog v-model="activeData.show" :title="activeData.title">
    <div v-html="activeData.content"></div>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import Type from "@/components/ArticleType.vue";
import downloadData from "@/utils/download.js";

let tableData = ref([]);

function readJSON() {
  let dom = document.getElementById("file");
  var fileReader = new FileReader();
  fileReader.readAsText(dom.files[0]);
  fileReader.onload = () => {
    try {
      let _data = JSON.parse(fileReader.result).data;
      if (Array.isArray(_data)) {
        tableData.value = _data;
      } else {
        tableData.value = [_data];
      }
    } catch {
      ElMessage.error("文件读取错误");
    }
  };
}

function create(data, index) {
  let _data = {
    type: data.type,
    article: data.content,
    title: data.title,
  };
  axios.post("/article", _data).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      tableData.value.splice(index, 1);
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

function allCreate() {
  let data = Object.assign({}, { data: tableData.value }).data;
  data.map(item => {
    let _data = {
      type: item.type,
      article: item.content,
      title: item.title,
    };
    return _data;
  });
  axios.post("/import/article", { data: data }).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

function download() {
  axios.get("/download/article").then(res => {
    let _data = JSON.parse(res.data.data).data.map(item => {
      item.content - item.article;
      return item;
    });
    downloadData(_data);
  });
}

let activeData = ref({ show: false });
</script>
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}
</style>
