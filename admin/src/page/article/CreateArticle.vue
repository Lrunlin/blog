<template>
  <el-tabs type="card" v-model="activeTab" :before-leave="beforeLeave">
    <el-tab-pane label="文章设置" :disabled="activeTab == '2'">
      <el-form label-width="120px">
        <el-form-item label="文章路由">
          <el-input v-model="data.router" placeholder="数字、字母或中划线3-36位(非必填)"></el-input>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input v-model="data.title" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="文章类型">
          <Type v-model:type="data.type" />
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="activeTab = '1'">开始编写</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="内容编写" :disabled="activeTab == '2'">
      <ArticleEditor v-model:html="data.article" />
      <el-button type="primary" @click="release">发布</el-button>
    </el-tab-pane>
    <el-tab-pane label="发布" :disabled="!hasReleaseRecord">
      <el-result icon="success" title="文章发布成功" :sub-title="`文章标题:${data.title}`">
        <template #extra>
          <el-button type="primary" size="medium" @click="link" v-if="data.router"
            >去看看</el-button
          >
          <el-button type="primary" size="medium" @click="router.push('/article')"
            >返回列表</el-button
          >
        </template>
      </el-result>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";
import Type from "@/components/ArticleType.vue";
import ArticleEditor from "@/components/ArticleEditor/index.vue";

let router = useRouter();

let data = reactive({ title: "", type: [], article: "" });
let activeTab = ref("0"); //当前选中的标签
let hasReleaseRecord = ref(false); //是否发布成功过

/** 发布文章*/
function release() {
  if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(data.article)) {
    ElMessage.error("请填写文章主体内容");
    return false;
  }
  axios
    .post("/article", {
      router: data.router,
      title: data.title,
      type: data.type,
      article: data.article,
    })
    .then(res => {
      if (res.data.success) {
        hasReleaseRecord.value = true;
        activeTab.value = "2";
      } else {
        ElMessage.error(res.data.message);
      }
    });
}

/** 拦截切换*/
function beforeLeave(activeName, oldActiveName) {
  if (oldActiveName == "0") {
    if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(data.title)) {
      ElMessage.error("请设置文章标题");
      return false;
    }
    if (!data.type.length) {
      ElMessage.error("请设置文章类型");
      return false;
    }
    if (data.router && !/^[a-zA-Z0-9-]{3,36}$/.test(data.router)) {
      ElMessage.error("文章路由只能由数字、字母或中划线组成");
      return false;
    }
  }
  if (oldActiveName == "1") {
    if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(data.article)) {
      ElMessage.error("请在配置信息和编写文章内容后发布");
      return false;
    }
  }
}

function link() {
  let path =
    process.env.NODE_ENV === "production"
      ? "https://blogweb.cn/article"
      : "http://localhost:5678/article";
  let a = document.createElement("a");
  a.href = `${path}/${data.router}`;
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => document.body.removeChild(a), 1000);
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
