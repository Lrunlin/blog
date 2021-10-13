
<template>
  <div ref="editorDom" class="editor"></div>
</template>

<script setup>
import { onMounted, ref, watchEffect,useAttrs } from "vue";
import { useStore } from "vuex";
import WangEditor from "wangeditor"; //富文本编辑器
import hljs from "highlight.js"; //代码高亮
import axios from "axios";
const editorDom = ref(null); //h获取dom
let editor;
let store = useStore();



// 创建富文本
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
  //自定义图上上传
  editor.config.customUploadImg = function (resultFiles, insertImgFn) {
    let formData = new FormData();
    formData.append("image", resultFiles[0]);
    // 环境判断提交对应地址
    let api = store.state.assetsapi;
    axios.post(api + "/assets", formData).then((res) => {
      insertImgFn(res.data.data);
    });
  };
  editor.create();
});
//赋值
onMounted(() => {
  watchEffect(() => {
    editor.txt.html(store.state.html);
  });
});
</script>
<style lang="scss">
.editor {
  width: 96%;
  margin: 0px auto;
  margin-top: 20px;
}
.w-e-text {
  padding-bottom: 80px;
  img {
    width: 80%;
  }
}
</style>








