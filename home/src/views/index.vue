<template>
  <div class="index">
    <div class="boxs">
      <div class="box" v-for="(item, index) in articleData" :key="index">
        <div class="title">{{ item.introduce }}</div>
        <div class="type">
          类型：<span>{{ item.type }}</span>
        </div>
        <div class="time">
          发布时间：<span>{{ item.time.substring(0, 10) }}</span>
        </div>
        <a :href="'https://blog.blogweb.cn/' + item.router" target="_blank"
          >阅读全文</a
        >
      </div>
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
.boxs {
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
}
.box {
  width: 18%;
  padding-left: 2%;
  height: 290px;
  box-shadow: rgb(212, 212, 212) 0px 0px 7px;
  border-radius: 10px;
  margin-top: 20px;
  .title {
    font-weight: 700;
    font-size: 18px;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 20px;
  }
  .type {
    font-size: 14px;
    color: #737373;
    margin-top: 10px;
    span {
      color: #505050;
    }
  }
}
</style>