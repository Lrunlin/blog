<template>
  <div id="editor" style="width: 90%"></div>
  <el-dialog title="预览" v-model="isPreview" width="70vw" destroy-on-close>
    <div v-html="props.setHTML"></div>
  </el-dialog>
</template>

<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from "vue";
import jquery from "jquery";
import option from "./option.js";
let isPreview = ref(false);
let emit = defineEmits();
let props = defineProps({
  setHTML: {
    type: String,
    required: true,
  },
});
let editor;
onMounted(() => {
  editor = option(
    "editor",
    e => {
      e.config.onchange = function (newHtml) {
        let _dom = jquery(`<div>${newHtml}</div>`);
        _dom.find("code").each((index, el) => {
          let className = jquery(el).attr("class");
          if (className) {
            if (!className.includes("language")) {
              jquery(el).removeAttr("class").attr("class", `language-${className}`);
            }
          }
        });
        emit("update:setHTML", jquery(_dom).html());
      };
    },
    () => {
      editor.txt.html(`${editor.txt.html()}<br/>`);
    }
  );
  let stopWatch = watchEffect(() => {
    editor.txt.html(props.setHTML);
    if (/^[\s\S]*.*[^\s][\s\S]*$/.test(editor.txt.html())) {
      setTimeout(() => {
        stopWatch();
      }, 0);
    }
  });
});
onBeforeUnmount(() => {
  editor.destroy();
  editor = null;
});
</script>
<style>
.w-e-text {
  padding-bottom: 20px !important;
}
pre {
  overflow: hidden;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
</style>
