<template>
  <el-form label-width="80px">
    <el-form-item label="文章路由">
      <el-input
        v-model="router"
        placeholder="不建议修改路由（不利于SEO）"
      ></el-input>
      <span v-if="idDisabled">
        <i class="el-icon-warning-outline"></i>
        有重复的路由了，换一个吧</span
      >
    </el-form-item>
    <el-form-item label="文章标题">
      <el-input v-model="title" placeholder="输入文章标题"></el-input>
    </el-form-item>
    <el-form-item label="权重设置">
      <span>是否置顶</span>
      <el-switch v-model="isTop"></el-switch>
      <span>是否展示</span>
      <el-switch v-model="isShow"></el-switch>
    </el-form-item>
    <el-form-item label="文章介绍">
      <el-input
        v-model="introduce"
        type="textarea"
        :rows="2"
        placeholder="输入文章介绍"
      ></el-input>
    </el-form-item>
    <el-form-item label="文章类型">
      <typeCom @setType="setType" :type="type"></typeCom>
    </el-form-item>
    <editorCom :html="html"></editorCom>
    <el-button type="primary" @click="updataArticle" :disabled="idDisabled"
      >发布文章</el-button
    >
  </el-form>
</template>
<script setup>
import { ref, computed, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { encode } from "js-base64";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

import notEmpty from "@/modules/notEmpty";
import resetImage from "@/modules/resetImage";
import setImageDom from "@/modules/setImageDom";
import moveImage from "@/modules/moveImage";
import updataImage from "@/modules/updataImage";

import typeCom from "@/components/type";
import editorCom from "@/components/editor";
let vueRouter = useRouter();
let route = useRoute();
let store = useStore();
let html = ref(""); //保存的HTML
let router = ref("");
let articleRouter = route.query.router; //文章路由（防止修改路由）
let title = ref("");
let introduce = ref("");
let type = ref("");
let isTop = ref(false);
let isShow = ref(true);
function setType(value) {
  type.value = value;
}

let idDisabled = computed(() => {
  return dangerRouter.value.includes(router.value)
    ? !(router.value == articleRouter)
    : false;
});

let dangerRouter = ref([]); //已经有的路由
axios.get("/article", { params: { key: "router" } }).then((res) => {
  dangerRouter.value = res.data.data.map((item) => item.router);
});

//初始 化数据
axios.get(`/article/${articleRouter}`).then((res) => {
  const data = res.data.data[0];
  router.value = data.router;
  title.value = data.title;
  isShow.value = !!data.isShow;
  isTop.value = !!data.isTop;
  introduce.value = data.introduce;
  type.value = data.type;
  html.value = resetImage(data.article);
});

function updataArticle() {
  // 发布文章
  setImageDom({ html: store.state.html, type: type.value }); //处理图片问题
  let data = {
    router: /^[\s\S]*.*[^\s][\s\S]*$/.test(router.value)
      ? router.value
      : +new Date() + "",
    title: encode(title.value),
    introduce: encode(introduce.value),
    type: type.value,
    article: encode(document.getElementById("set_image").innerHTML),
    isTop: isTop.value,
    isShow: isShow.value,
  };

  if (notEmpty(data)) {
    axios.put(`/article/${articleRouter}`, data).then((res) => {
      if (res.data.success) {
        updataImage(store.state.html, html.value);
        ElMessage.success("更新成功");
        store.commit("setHtml", "");
        vueRouter.push("/");
      } else {
        ElMessage.success("更新失败");
      }
    });
  } else {
    ElMessage.error("请填写全部内容。");
  }
}

onUnmounted(() => {
  store.commit("setHtml", "");
});
</script>
<style scoped lang='scss'>
.el-form {
  display: block;
  margin: 0px auto;
  margin-top: 40px;
  width: 700px;
}
.el-input,
.el-textarea {
  width: 400px !important;
}
.el-button {
  display: block;
  width: 200px;
  margin: 0px auto;
  margin-top: 40px;
}
.el-switch {
  margin-left: 10px;
}
</style>