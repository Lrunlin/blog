将HTML注入div
创建HTML：
判断图片文件，将src换为data-src，动态修改图片alt，删除src属性
将图片路径从暂存文件夹转换为正式文件夹，
获取文件名称，存入数组，（判断如果有src就存）
处理代码块（添加一个标题属性）

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
  <alert :text="text" v-show="alertIsShow"></alert>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Base64 } from "js-base64";
import alert from "@/components/alert.vue";
import typeSelect from "@/components/typeSelect";
import createArticle from "@/modules/article/create-article";
import moveTemporaryImages from "@/modules/article/moveTemporaryImages";
let store = useStore();
let vueRouter = useRouter();
let boxHtml = store.state.html;
let alertIsShow = ref(false); //遮罩层
let text = ref(""); //遮罩层提示文字


let images = []; //存储被选中的图片
function beforeCreateHtml() {
  let img = document.querySelectorAll("#htmlBox img");
  if (img.length) {
    alertIsShow.value = true;
    text.value = "正在处理图片（alt,路径置换）";
    img.forEach((el, i) => {
      if (el.getAttribute("src")) {
        //只有第一次点击时候会处理图片（第一次会删除src第二次就不好使了）
        el.setAttribute("data-src", el.getAttribute("src"));
        el.removeAttribute("src");
        el.setAttribute("alt", `关于${type.value}技术讲解图片`);
        let oldPath = store.state.assets + "temporary";
        let newPath = store.state.assets + "image";
        let dataSrc = el.getAttribute("data-src");
        el.setAttribute("data-src", dataSrc.replace(oldPath, newPath));
        //将临时文件夹的路径替换到正式文件夹
        let src = dataSrc.replace(oldPath + "/", "");
        images.push(src);
      }
    });
  }
  let pre = document.querySelectorAll("#htmlBox pre");
  if (pre.length) {
    alertIsShow.value = true;
    text.value = "正在处理代码块";
    for (let index = 0; index < pre.length; index++) {
      const el = pre[index];
      el.setAttribute('data-handle','true')
      const code = el.getElementsByTagName("*")[0];
      // 弄标题
      const title = document.createElement("div");
      title.innerHTML = el.getAttribute("type");
      title.className = "code-title";
      el.insertBefore(title, code);
      document.getElementsByClassName(
        "code-title"
      )[0].innerHTML += `<div class="bar" style="background: red;"></div>`;
      document.getElementsByClassName(
        "code-title"
      )[0].innerHTML += `<div class="bar" style="background: green;"></div>`;
      document.getElementsByClassName(
        "code-title"
      )[0].innerHTML += `<div class="bar" style="background: yellow;"></div>`;
    }
  }
}

let router = ref(""); //路由
let isTop = ref(false); //是否置顶
let isShow = ref(true); //是否显示
let introduce = ref(""); //简介
let html = Base64.encode(boxHtml);
if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(html)) vueRouter.go(-1); //如果没有HTML返回上一级
let type = ref("");
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
    beforeCreateHtml();
    createArticle({
      router: router.value,
      type: type.value,
      introduce: introduce.value,
      article: Base64.encode(document.getElementById("htmlBox").innerHTML),
      isTop: isTop.value,
      isShow: isShow.value,
    }).then((res) => {
      if (res.res) {
        ElMessage.success({
          message: `添加成功`,
          type: "success",
        });
        // 是否需要请求替换图片文件夹（HTML内是否有图片）
        if (images.length) {
          alertIsShow.value = true;
          text.value = "正在迁移图片...";
          moveTemporaryImages({
            api: store.state.assetsapi,
            images: images,
          }).then((res) => {
            alertIsShow.value = false;
          });
        } else {
          alertIsShow.value = false;
        }
        timer = setTimeout(() => {
          vueRouter.push("/");
        }, 3000);
      } else {
        ElMessage.error({
          message: `添加失败`,
          type: "error",
        });
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