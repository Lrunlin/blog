<template>
  <div class="index">
    <div class="box" v-for="(item, index) in articleData" :key="index">
      <div class="title">{{ item.introduce }}</div>
      <div class="type">{{ item.type }}</div>
      <div class="time">
        发布时间：<span>{{ item.time.substring(0, 10) }}</span>
      </div>
      <a :href="'https://blog.blogweb.cn/' + item.router" target="_blank"
        >阅读全文</a
      >
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Base64 } from "js-base64";
import readArticle from "@/modules/read-article";
let articleData = ref([]);
readArticle({ time: "DESC", index: 0 }).then((res) => {
  articleData.value = res.data.slice(0, 10);
});
</script>
<style scoped lang='scss'>
</style>