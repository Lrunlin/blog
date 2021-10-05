<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="time" label="订阅时间" />
  </el-table>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
let tableData = ref([]);
axios.get("/rss").then((res) => {
  tableData.value = res.data.data;
});
</script>
<style scoped lang='scss'>
</style>