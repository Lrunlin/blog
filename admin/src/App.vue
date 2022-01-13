<template>
  <router-view />
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

let router = useRouter()
router.beforeEach((to, form, next) => {
  document.title = to.meta.title || '博客管理系统';
  next();
})
</script>
<style lang="scss">
body {
  margin: 0px;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>