<template>
  <el-select
    v-model="type"
    multiple
    style="margin-left: 20px"
    placeholder="请选择文章类型"
  >
    <el-option
      v-for="item in typeHub"
      :key="item.type"
      :label="item.type"
      :value="item.type"
    >
    </el-option>
  </el-select>
</template>
<script setup>
import { defineEmit, defineProps, ref, watch } from "vue";
import axios from "axios";

let typeHub = ref({});
axios.get("/type", { params: { key: "type" } }).then((res) => {
  typeHub.value = res.data.data;
});

// 接收传来的类型的值
let type = ref("");
let props=defineProps(['type'])
watch(props,(newValue,oldValue)=>{
  type.value=newValue.type.split(',');
})
let emit = defineEmit();
watch(type, (n, o) => {
  emit("setType", n.join(","));
});
</script>
<style scoped lang='scss'>
.el-select {
  width: 400px;
  margin: 0px !important;
}
</style>