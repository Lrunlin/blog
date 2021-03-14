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
    <updataEditor :html="setHtml" class="updata-editor"></updataEditor>

    <el-button type="primary" @click="updataArticleFun">修改文章</el-button>
  </el-form>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { Base64 } from "js-base64";

import updataEditor from "@/components/updata-editor";
import typeSelect from "@/components/typeSelect";
import readRouter from "@/modules/article/read-router.js";

import createHtml from "@/modules/function/createHtml"; //处理HTML
import updataHtml from "@/modules/function/updataHtml.js";
import updataArticle from "@/modules/article/updata-article";

let route = useRoute();
let store = useStore();
let thisRouter = route.query.router;

let type = ref(""); //作为传值用的
let router = ref("");
let isTop = ref();
let isShow = ref();
let introduce = ref("");
let setHtml = ref(""); //获取的HTML
let time;
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
  time = data.time;
});

function getType(value) {
  type.value = value;
}
const stop = watchEffect(() => {
  if (setHtml.value != "") {
    if (document.getElementById("updataHtml")) {
      document.getElementById("updataHtml").remove();
    }
    let box = document.createElement("div");
    box.style.display = "none";
    box.id = "updataHtml";
    box.innerHTML = setHtml.value;
    document.body.append(box);

    let img = document.querySelectorAll("#updataHtml img");
    img.forEach((el) => {
      el.setAttribute("src", el.getAttribute("data-src"));
    });
    setHtml.value = box.innerHTML;
    stop();
  }
});
function updataArticleFun() {
  updataHtml({
    type: type.value,
  });
  createHtml({
    html: document.querySelectorAll(".w-e-text")[0].innerHTML,
    type: type.value,
    path: store.state.assetsapi,
  });
  updataArticle({
    router: router.value,
    type: type.value,
    introduce: introduce.value,
    isTop: isTop.value,
    isShow: isShow.value,
    time: time,
  }).then((res) => {
    console.log(res);
  });
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