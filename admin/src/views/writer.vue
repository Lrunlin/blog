<template>
  <Editor></Editor>
  <el-button type="primary" block @click="finishWrite">写完了</el-button>
</template>
<script setup>
import { ref, computed } from "vue";
import Editor from "@/components/editor";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
let store = useStore();
let router = useRouter();

function finishWrite() {
  router.push("/finish");
}
</script>
<style scoped lang='scss'>
.el-button {
  width: 300px;
  display: block;
  margin: 0px auto;
  margin-top: 30px;
}
</style>