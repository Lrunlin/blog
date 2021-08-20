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
const editorDom = ref(null); //h获取dom
let editor;
let store = useStore();

const prop = defineProps(["html"]);
watch(prop, (newValue, oldValue) => {
  editor.txt.html(newValue.html);
  //收到组件传的值后重置一下HTML，处理图片的一些属性
  store.commit("setHtml", editor.txt.html(newValue.html));
});

let data = {
  time: +new Date(),
  salt: Math.random().toString(32),
  sign: null,
};
data.sign = md5("刘润霖0621" + "post" + data.time + data.salt);

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

  editor.config.height = 500; //高度500
  editor.highlight = hljs; //代码高亮

  // 上传图片相关
  editor.config.uploadImgServer = api + "/upload-assets";
  // 请求头
  editor.config.uploadImgHeaders = {
    authorization: encode(JSON.stringify(data)),
  };

  editor.config.uploadFileName = "image"; //定义上传FromData的名字
  editor.config.uploadImgAccept = ["jpg", "jpeg", "png"]; //类型
  editor.config.showLinkImg = false; //禁止网络图片
  editor.config.onchange = function (newHtml) {
    store.commit("setHtml", newHtml);
  };
  editor.create();
  editor.txt.html(store.state.html);
});

// 生成时候读取vuex的数据，走时候存上
</script>