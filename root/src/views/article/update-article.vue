<template>
  <div v-html="boxHtml" id="htmlBox" v-show="false"></div>
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
      <typeSelect :setType="type" @getType="getType"></typeSelect>
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
    <updataEditor :html="setHtml"></updataEditor>

    <!-- <el-button type="primary" @click="create">添加文章</el-button> -->
  </el-form>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { Base64 } from "js-base64";

import updataEditor from "@/components/updata-editor";
import typeSelect from "@/components/typeSelect";
import readRouter from "@/modules/article/read-router.js";
let route = useRoute();
let store = useStore();
let thisRouter = route.query.router;

let type = ref(""); //作为传值用的
let boxHtml = ref("");
let router = ref("");
let isTop = ref();
let isShow = ref();
let introduce = ref("");
let setHtml = ref(""); //获取的HTML
let types = ref("");
readRouter({ router: thisRouter }).then((res) => {
  // 根据路由请求并赋值
  let data = res.data;
  [router.value, isTop.value, isShow.value, introduce.value] = [
    data.router,
    data.isTop ? true : false,
    data.isShow ? true : false,
    data.introduce,
  ];
  type.value = data.type;
  /*
   ?为子组件传输字符串，数据有子组件处理
  */
  setHtml.value = Base64.decode(data.article);
});

function getType(value) {
  console.log(value);
}
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
  width: 280px !important;
}
</style>