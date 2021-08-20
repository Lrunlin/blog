<template>
  <el-form label-width="80px">
    <el-form-item label="文章路由">
      <el-input v-model="router" placeholder="输入文章路由"></el-input>
      <span v-if="dangerRouter.includes(router)">
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
      <typeCom @setType="setType"></typeCom>
    </el-form-item>
    <el-button
      type="primary"
      @click="createArticle"
      :disabled="dangerRouter.includes(router)"
      >发布文章</el-button
    >
  </el-form>
</template>
<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { encode } from "js-base64";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import notEmpty from "@/modules/notEmpty";
import setImageDom from "@/modules/setImageDom";
import moveImage from "@/modules/moveImage";
import typeCom from "@/components/type";
import editorCom from "@/components/editor";
let vueRouter = useRouter();
let store = useStore();
let html = store.state.html;
let router = ref("");
let title = ref("");
let introduce = ref("");
let type;
let isTop = ref(false);
let isShow = ref(true);

function setType(value) {
  type = value;
}
if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(html)) {
  vueRouter.push("/writer");
}

let dangerRouter = ref([]); //已经有的路由
axios.get("/article", { params: { key: "router" } }).then((res) => {
  dangerRouter.value = res.data.data.map((item) => item.router);
});

function createArticle() {
  // 发布文章
  setImageDom({ html: html, type: type }); //处理图片问题
  let data = {
    router: /^[\s\S]*.*[^\s][\s\S]*$/.test(router.value)
      ? router.value
      : +new Date() + "",
    title: encode(title.value),
    introduce: encode(introduce.value),
    type: type,
    article: encode(document.getElementById("set_image").innerHTML),
    isTop: isTop.value,
    isShow: isShow.value,
  };
  if (notEmpty(data)) {
    axios.post("/article", data).then((res) => {
      if (res.data.success) {
        ElMessage.success("添加成功");
        moveImage(); //挪动图片
        store.commit("setHtml", "");
        vueRouter.push("/");
      } else {
        ElMessage.success("添加失败请检查是否路由重复");
      }
    });
  } else {
    ElMessage.error("请填写全部内容。");
  }
}
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