<template>
  <el-result icon="error" title="没有找到对应的页面">
    <template #extra>
      <el-button type="primary" @click="router.back()">返回</el-button>
    </template>
  </el-result>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
let router=useRouter()
</script>
<style scoped lang="scss"></style>
