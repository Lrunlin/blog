<template>
  <!-- 多嵌套一层，取消掉不显示的博文，避免if和for使用在同一层 -->
  <div class="index">
    <el-skeleton :rows="4" animated v-if="isAwait" />
    <el-skeleton :rows="4" animated v-if="isAwait" />
    <el-skeleton :rows="4" animated v-if="isAwait" />
    <el-skeleton :rows="4" animated v-if="isAwait" />
    <el-skeleton :rows="4" animated v-if="isAwait" />
    <article class="box" v-for="(item, index) in articleData" :key="index">
      <div class="article-head">
        <a class="article-title" :href="store.state.articleUrl + item.router">{{
          Base64.decode(item.title)
        }}</a>
        <time class="article-time">{{ item.time.substring(0, 10) }}</time>
      </div>
      <div class="article-text">{{ Base64.decode(item.introduce) }}</div>
      <p class="read">
        <a :href="store.state.articleUrl + item.router" target="_blank"
          >阅读全文»</a
        >
      </p>
    </article>
    <div class="article-foot">
      <button
        :disabled="index == 0"
        @click="getArticle(index, false)"
        class="before switch"
      >
        &lt;&lt;上一页
      </button>
      <div class="schedule">{{ index + 1 }}/{{ articleLength }}</div>
      <button
        :disabled="index + 1 == articleLength"
        @click="getArticle(index, true)"
        class="after switch"
      >
        下一页>>
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Base64 } from "js-base64";
import readArticle from "@/modules/read-article";
import api from "@/modules/api";

import { useStore } from "vuex";
let store = useStore();

// 查询文章信息，将初始值设置为-1，后每次查询都将索引值++
let articleData = ref([]);
let index = ref(-1);
let isAwait = ref(true);
function getArticle(i, isAdd) {
  console.time('ajax')
  isAdd ? index.value++ : index.value--;
  i = index.value;
  api(
    `select * from article WHERE isShow=1 ORDER by time DESC limit ${
      0 + i * 10
    }, ${i * 10 + 10};`
  ).then((res) => {
    if (res.res) {
      isAwait.value = false;
      articleData.value = res.res;
      console.timeEnd('ajax')
    }
  });
}
getArticle(index.value, true);

let articleLength = ref("");
api(`select * from article where isShow=1;`).then((res) => {
  articleLength.value = Math.ceil(res.res.length / 10);
});
</script>
<style scoped lang='scss'>
.box {
  padding: 5px 0px;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #fff;
}
.article-head {
  height: 50px;
  line-height: 50px;
  .article-title {
    width: calc(100% - 150px);
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    font-weight: 400;
    font-size: 32px;
    color: #333;
    float: left;
    text-decoration: none;
    &:hover {
      color: #076dd0;
      cursor: pointer;
    }
  }
  .article-time {
    float: right;
    margin-right: 20px;
  }
}
.article-text {
  color: #444;
  padding: {
    top: 5px;
    bottom: 10px;
    right: 200px;
  }
}
.read {
  margin-top: 15px;
  margin-bottom: 20px;
  a {
    text-decoration: none;
    color: #076dd0;
  }
}
.article-foot {
  height: 80px;
  line-height: 80px;
  display: flex;
  justify-content: space-between;
  .before {
    margin-left: 10px;
  }
  .schedule {
    margin: 0px auto;
    float: left;
    width: 100px;
  }
  .after {
    margin-right: 10px;
  }
  .switch {
    width: 100px;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
    text-align: center;
    clear: both;
    border: 0px;
    background: none;
    cursor: pointer;
    outline: none;
  }
}
</style>