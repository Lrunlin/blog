<template>
  <el-skeleton v-if="isSuccess == null" />
  <el-tabs type="card" v-model="activeTab" v-if="isSuccess === true">
    <el-tab-pane label="文章设置">
      <el-form label-width="120px">
        <el-form-item label="文章路由">
          <el-input v-model="data.router" placeholder="非必填"></el-input>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input v-model="data.title" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker v-model="data.time" type="datetime" placeholder="选择文章发布时间" />
        </el-form-item>
        <el-form-item label="浏览量">
          <el-input-number v-model="data.view_count" :min="1" :step="2" />
        </el-form-item>
        <el-form-item label="文章类型">
          <Type v-model:type="data.type" />
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="activeTab = '1'">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="内容编写">
      <ArticleEditor v-if="isSuccess === true" v-model:html="data.article" />
      <el-button type="primary" @click="update">发布</el-button>
    </el-tab-pane>
  </el-tabs>
  <el-result
    icon="warning"
    title="未找到对应文章"
    sub-title="没有找到对应的文章"
    v-if="isSuccess === false"
  >
    <template #extra>
      <el-button type="primary" size="medium" @click="router.back()">返回</el-button>
    </template>
  </el-result>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";
import Type from "@/components/ArticleType.vue";
import ArticleEditor from "@/components/ArticleEditor/index.vue";
import jquery from "jquery";

let route = useRoute();
let router = useRouter();
let isSuccess = ref(null);
let data = reactive({ title: "", type: ["1"], article: "" });

function switchImageSrc(html) {
  let dom = jquery(`<div>${html}</div>`);
  dom.find("img").each((index, el) => {
    if (jquery(el).attr("data-src")) {
      jquery(el).attr("src", jquery(el).attr("data-src"));
    }
  });
  return dom.html();
}

axios.get(`/article/${route.params.id}`).then(res => {
  if (res.data.success) {
    data.router = res.data.data.router;
    data.title = res.data.data.title;
    data.type = res.data.data.type;
    data.article = switchImageSrc(res.data.data.article);
    data.time = res.data.data.time;
    data.view_count = res.data.data.view_count;
    isSuccess.value = true;
  } else {
    isSuccess.value = false;
  }
});

let activeTab = ref("0"); //当前选中的标签
function update() {
  if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(data.article)) {
    ElMessage.error("请填写文章主体内容");
    return false;
  }
  if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(data.article)) {
    ElMessage.error("请填写文章主体内容");
    return false;
  }
  axios
    .put(`/article/${route.params.id}`, {
      router: data.router,
      title: data.title,
      type: data.type,
      article: data.article,
      view_count: data.view_count,
    })
    .then(res => {
      if (res.data.success) {
        ElMessage.success("更新成功");
      } else {
        ElMessage.error(res.data.message);
      }
    });
}
</script>
<style scoped lang="scss">
.el-input {
  width: 400px;
}
.el-button {
  margin-top: 20px;
}
</style>
