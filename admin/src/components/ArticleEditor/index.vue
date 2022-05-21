<template>
  <div id="editor"></div>
</template>

<script setup>
import { onMounted, onUnmounted, watchEffect } from "vue";
import WangEditor from "wangeditor";
import { useStore } from "vuex";
import axios from "axios";
import jquery from "jquery";
let store = useStore();
let editor = null;
let props = defineProps({
  html: {
    type: String,
    required: true,
  },
});
const emit = defineEmits();

onMounted(() => {
  editor = new WangEditor("#editor");
  //文件上传
  editor.config.uploadImgMaxSize = 3 * 1024 * 1024;
  editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "webp"];
  editor.config.showLinkImg = false;

  editor.config.customUploadImg = function (resultFiles, insertImgFn) {
    let formData = new FormData();
    formData.append("image", resultFiles[0]);
    axios.post(`/assets`, formData).then(res => {
      insertImgFn(res.data.data);
    });
  };

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
  editor.config.languageType = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "TSX",
    "JSX",
    "JSON",
    "XML",
    "Bash",
    "Stylus",
    "SASS",
    "SQL",
    "JAVA",
    "Python",
    "C",
    "CPP",
  ];
  editor.config.height = 500;

  editor.config.onchange = function (newHtml) {
    let _dom = jquery(`<div>${newHtml}</div>`);
    _dom.find("code").each((index, el) => {
      let className = jquery(el).attr("class");
      if (className) {
        if (!className.includes("language")) {
          jquery(el).removeAttr("class").attr("class", `language-${className.toLocaleLowerCase()}`);
        }
      }
    });
    emit("update:html", jquery(_dom).html());
  };
  const { $, BtnMenu } = WangEditor;
  class AlertMenu extends BtnMenu {
    constructor(editor) {
      // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
      const $elem = WangEditor.$(
        `<div class="w-e-menu" data-title="移动至最后一行">
                <button>END</button>
            </div>`
      );
      super($elem, editor);
    }
    // 菜单点击事件y
    clickHandler() {
      editor.txt.html(`${editor.txt.html()}<br/>`);
    }
    tryChangeActive() {
      this.active();
    }
  }

  const menuKey = "LineFeed";
  WangEditor.registerMenu(menuKey, AlertMenu);

  editor.create();
  let stopWatch = watchEffect(() => {
    editor.txt.html(props.html);
    if (/^[\s\S]*.*[^\s][\s\S]*$/.test(editor.txt.html())) {
      setTimeout(() => {
        stopWatch();
      }, 0);
    }
  });
});
onUnmounted(() => {
  editor.destroy();
  editor = null;
});
</script>
<style>
.w-e-text-container img {
  width: 60%;
}
pre {
  width: 100%;
  overflow: hidden;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
.w-e-text {
  padding-bottom: 20px !important;
}
</style>
