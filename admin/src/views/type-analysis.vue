<template>
  <TypeEcharts :data="data" />
</template>
<script setup>
import { ref, reactive } from "vue";
import TypeEcharts from "@/components/typeEcharts";
import axios from "axios";
let data = ref([]);
axios.get("/article", { params: { key: "type" } }).then((res) => {
  data.value=res.data.data;
});
</script>
<style scoped lang='scss'>
</style>