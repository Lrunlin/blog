<template>
  <div class="index">
    <div class="boxs">
      <div class="box" v-for="(item, index) in articleData" :key="index">
        <div class="title">{{ Base64.decode(item.title) }}</div>
        <div class="type">
          类型：<span>{{ item.type }}</span>
        </div>
        <div class="introduce">{{ Base64.decode(item.introduce) }}</div>
        <div class="time">
          发布时间：<span>{{ item.time.substring(0, 10) }}</span>
        </div>
        <a
          class="href"
          :href="'https://blog.blogweb.cn/' + item.router"
          target="_blank"
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
  articleData.value = res.data.slice(0, 12);
});
</script>
<style scoped lang='scss'>
.boxs {
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: calc(100% - 40px);
}
.box {
  width: 20%;
  padding-left: 2%;
  height: 290px;
  box-shadow: rgb(212, 212, 212) 0px 0px 7px;
  border-radius: 10px;
  margin-top: 20px;
  &:hover {
    transition: 0.5s;
    transform: translateX(2px) translateY(2px);
  }
  .title {
    font-weight: 700;
    font-size: 18px;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 20px;
  }
  .introduce {
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    height: 120px;
    margin-top: 10px;
  }
  .type {
    font-size: 14px;
    color: #737373;
    margin-top: 10px;
    span {
      color: #505050;
    }
  }
  .time {
    font-size: 14px;
  }
  .href {
    width: 100px;
    height: 40px;
    margin-left: calc((90% - 100px) / 2);
    text-decoration: none;
    line-height: 40px;
    text-align: center;
    margin-top: 10px;
    color: black;
    border: 2px solid black;
    display: block;
    &:hover {
      transition: 0.5s;
      color: white;
      background: black;
    }
  }
}
</style>