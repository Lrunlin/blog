<template>
  <!-- 封装Icon组件，对在阿里矢量库下载的SVG实现快速引用 -->
  <img
    :src="icon"
    class="icon"
    :style="{ height: props.size + 'px', width: props.size + 'px' }"
    alt="icon"
  />
</template>
<script setup>
import { ref } from "vue";
let icon = ref("");
let props = defineProps({
  icon: {
    required: true,
    type: String,
  },
  size: {
    required: false,
    type: [Number, String],
    default: 16,
  },
  color: {
    required: false,
    type: String,
  },
});
import(`../assets/icons/${props.icon}.svg`).then(res => {
  icon.value = res.default;
});
</script>
<style scoped lang="scss"></style>
