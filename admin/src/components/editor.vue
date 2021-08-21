<template>
  <div ref="editorDom"></div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch } from "vue";
import { useStore } from "vuex";
import WangEditor from "wangeditor"; //富文本编辑器
import hljs from "highlight.js"; //代码高亮
import { encode } from "js-base64";
import md5 from "md5";
import Cookie from "js-cookie";
import axios from "axios";
const editorDom = ref(null); //h获取dom
let editor;
let store = useStore();

const prop = defineProps(["html"]);
watch(prop, (newValue, oldValue) => {
  editor.txt.html(newValue.html);
  //收到组件传的值后重置一下HTML，处理图片的一些属性
  store.commit("setHtml", editor.txt.html());
});

onMounted(() => {
  editor = new WangEditor(editorDom.value); //根据dom创建
  editor.config.menus = [
    "head",
    "bold",
    "fontSize",
    "fontName",
    "italic",
    "underline",
    "strikeThrough",
    "indent",
    "lineHeight",
    "foreColor",
    "backColor",
    "link",
    "list",
    "todo",
    "justify",
    "quote",
    "image",
    "table",
    "code",
    "splitLine",
  ];

  // 设置代码语言
  editor.config.languageType = [
    "JavaScript",
    "VUE",
    "React",
    "HTML",
    "CSS",
    "NodeJS",
    "TypeScript",
    "JSON",
    "C",
    "C#",
    "C++",
    "Java",
    "SQL",
    "Go",
    "PHP",
    "Python",
    "Code",
  ];

  editor.config.height = 500; //高度500
  editor.highlight = hljs; //代码高亮

  editor.config.uploadImgAccept = ["jpg", "jpeg", "png"]; //类型
  editor.config.showLinkImg = false; //禁止网络图片
  editor.config.onchange = function (newHtml) {
    store.commit("setHtml", newHtml);
  };
  //自定义图上上传，主要解决验证问题
  editor.config.customUploadImg = function (resultFiles, insertImgFn) {
    let formData = new FormData();
    formData.append("image", resultFiles[0]);
    // 环境判断提交对应地址
    let api = store.state.assetsapi;
    axios.post(api + "/upload-assets", formData).then((res) => {
      insertImgFn(res.data.data);
    });
  };
  editor.create();
  editor.txt.html(store.state.html);
});
// 生成时候读取vuex的数据，每次修改存上
</script>
<style lang="scss">
.w-e-text {
  img {
    width: 80%;
  }
}
</style>