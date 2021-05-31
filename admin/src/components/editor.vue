<template>
  <div ref="editor"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { useStore } from "vuex";
import WangEditor from "wangeditor"; //富文本编辑器
import hljs from "highlight.js"; //代码高亮
import { Base64 } from "js-base64";
const editor = ref(); //h获取dom
const content = reactive({
  html: "",
});
let instance;
let store = useStore();
onMounted(() => {
  instance = new WangEditor(editor.value); //根据dom创建
  instance.config.menus = [
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
  instance.config.languageType = [
    "JavaScript",
    "VUE",
    "React",
    "HTML",
    "C",
    "C#",
    "C++",
    "CSS",
    "NodeJS",
    "Java",
    "JSON",
    "TypeScript",
    "SQL",
    "Go",
    "PHP",
    "Python",
    "代码部分",
  ];
  // 环境判断提交对应地址
  let api = store.state.assetsapi;
  // 上传图片
  instance.config.uploadImgServer = api + "/upload-asset";
  instance.config.height = 500; //高度500
  instance.highlight = hljs; //代码高亮
  instance.create();
  instance.txt.html(store.state.html);
});
onBeforeUnmount(() => {
  store.commit("setHtml", instance.txt.html());
});
// 生成时候读取vuex的数据，走时候存上
</script>