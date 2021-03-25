<template>
  <div ref="editor"></div>
</template>

<script setup>
import { onMounted, onUpdated, ref, reactive, defineProps } from "vue";
import { useStore } from "vuex";
import WangEditor from "wangeditor"; //富文本编辑器
import hljs from "highlight.js"; //代码高亮

const editor = ref(); //h获取dom
const content = reactive({
  html: "",
});
let props = defineProps({
  html: String,
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
    "emoticon",
    "image",
    "table",
    "code",
    "splitLine",
  ];
  // 环境判断提交对应地址
  let api = store.state.assetsapi;
  // 上传图片
  instance.config.uploadImgServer = api + "/uploadAsset";
  instance.config.height = 500; //高度500
  instance.highlight = hljs; //代码高亮
  // 配置表情
  instance.config.emotions = [
    {
      title: "选择表情",
      type: "emoji",
      content: "😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐".split(
        /\s/
      ),
    },
  ];
  instance.config.languageType = [
    "JavaScript",
    "VUE",
    "HTML",
    "C",
    "C#",
    "C++",
    "CSS",
    "nodeJS",
    "Java",
    "JSON",
    "TypeScript",
    "SQL",
    "Go",
    "PHP",
    "Python",
    "代码部分",
  ];
  instance.create();
  instance.txt.html(props.html);
});
// 每次数据更新时候重新赋值
onUpdated(() => {
  instance.txt.html(props.html);
});
// 生成时候读取vuex的数据，走时候存上
</script>

