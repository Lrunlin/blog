<template>
  <el-select v-model="value" @change="change" :multiple="props.multiple" placeholder="选择文章类型">
    <el-option
      v-for="item in type"
      :key="item.type"
      :label="item.type"
      :value="item.type"
    ></el-option>
  </el-select>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";

let value = ref([]);
watchEffect(() => {
  value.value = props.type;
});

axios.get("/type", { params: { decorate: true } }).then(res => {
  type.value = res.data.data;
});
let props = defineProps({
  type: {
    type: [Array, String],
    required: true,
  },
  multiple: {
    type: Boolean,
    required: false,
    default: true,
  },
});
let type = ref([]);

let emit = defineEmits();

function change(value) {
  emit("update:type", value);
}
</script>
<style scoped lang="scss"></style>
