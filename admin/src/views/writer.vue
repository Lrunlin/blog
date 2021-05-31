<template>
  <Editor></Editor>
  <el-button type="primary" block>写完了</el-button>
</template>
<script setup>
import { ref } from "vue";
import Editor from "@/components/editor";
</script>
<style scoped lang='scss'>
.el-button {
  width: 300px;
  display: block;
  margin: 0px auto;
  margin-top: 30px;
}
</style>