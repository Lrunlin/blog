将HTML注入div
创建HTML：
判断图片文件，将src换为data-src，动态修改图片alt，删除src属性
将图片路径从暂存文件夹转换为正式文件夹，
获取文件名称，存入数组，（判断如果有src就存）
处理代码块（添加一个标题属性）

<template>
  <el-form :inline="true">
    <el-form-item label="路由设置">
      <el-input
        v-model="router"
        placeholder="自定义路由（没有就自动生成）"
      ></el-input>
    </el-form-item>
    <div class="select">
      <el-form-item label="是否置顶">
        <el-switch v-model="isTop"></el-switch>
      </el-form-item>
      <el-form-item label="是否展示">
        <el-switch v-model="isShow"></el-switch>
      </el-form-item>
    </div>
    <el-form-item label="选择类型">
      <typeSelect @getType="setType"></typeSelect>
    </el-form-item>
    <el-form-item label="文章介绍">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="introduce"
        class="introduce"
        :autosize="{ minRows: 5 }"
      >
      </el-input>
    </el-form-item>
    <el-button type="primary" @click="create">添加文章</el-button>
  </el-form>
</template>
<script setup>
import { ref, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Base64 } from "js-base64";
import typeSelect from "@/components/typeSelect";
// import createArticle from "@/modules/article/create-article";
// import moveTemporaryImages from "@/modules/article/moveTemporaryImages";
import createArticleFun from "@/modules/function/createArticle";

let store = useStore();
let vueRouter = useRouter();
let router = ref(""); //路由
let isTop = ref(false); //是否置顶
let isShow = ref(true); //是否显示
let introduce = ref(""); //简介
let html = store.state.html;
let type = ref("");
if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(html)) vueRouter.go(-1); //如果没有HTML返回上一级
function setType(typeValue) {
  //设置子组件传来的类型
  type.value = typeValue;
}

let timer;
function create() {
  let test = /^[\s\S]*.*[^\s][\s\S]*$/;
  if (test.test(introduce.value) == false || test.test(type.value) == false) {
    ElMessage.error({
      message: `请将内容填全`,
      type: "error",
    });
  } else {
    createArticleFun({
      router: router.value,
      type: type.value,
      isTop: isTop.value,
      isShow: isShow.value,
      introduce: introduce.value,
      html: html,
      path: store.state.assets,
      assetsApi: store.state.assetsapi,
    }).then((res) => {
      if (res) {
        timer = setTimeout(() => {
          vueRouter.go(0);
        }, 2000);
      }
    });
  }
}
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>
<style scoped lang='scss'>
.el-form {
  padding-left: 100px;
  .el-form-item {
    margin-top: 15px;
    display: block;
    .el-input {
      width: 400px;
    }
  }
}
.select {
  display: flex;
  .el-form-item {
    margin: 0px !important;
  }
}
.introduce {
  width: 230px !important;
}
</style>