<template>
  <Editor />
  <el-button type="primary" @click="create">编辑完成</el-button>
</template>
<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import Editor from "@/components/article/Editor.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
let store = useStore();
let router = useRouter();
function create() {
  if (/^[\s\S]*.*[^\s][\s\S]*$/.test(store.state.html)) {
    router.push({ path: "/option" });
  } else {
    ElMessage.error("请编写文章内容");
  }
}
</script>
<style scoped lang='scss'>
.el-button {
  width: 200px;
  display: block;
  margin: 0px auto;
  margin-top: 20px;
}
</style>