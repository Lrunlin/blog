<template>
  <div class="type">
    <header>
      <el-input
        placeholder="文章关键词"
        v-model="keyword"
        clearable
        class="search-text"
        @keydown.enter="search"
      >
      </el-input>
      <el-button
        icon="el-icon-search"
        circle
        class="search-button"
        @click="search"
      ></el-button>
    </header>
    <nav>
      <el-tag
        v-for="item in types"
        :key="item.type"
        :title="'查看关于' + item.type + '的文章'"
        @click="readTypeArticle(item.type)"
      >
        {{ item.type }}
      </el-tag>
    </nav>
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
  </div>
  <el-empty
    description="没找到相应文章..."
    v-if="articleData.length == 0"
  ></el-empty>
</template>
<script setup>
import { ref } from "vue";
import { Base64 } from "js-base64";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import readType from "@/modules/read-type";
import api from "@/modules/api";

let store = useStore();
let route = useRoute();

let types = ref();
readType().then((res) => {
  types.value = res.data;
});
let articleData = ref([]);

// 初始化，查询置顶的文章
api(
  `SELECT * from article  WHERE isTop=1 and isShow=1 ORDER by time DESC;`
).then((res) => {
  articleData.value = res.res;
});

function readTypeArticle(type) {
  api(
    `SELECT * from article  WHERE type LIKE '%${type}%' and isShow=1 ORDER by time DESC;`
  ).then((res) => {
    articleData.value = res.res;
  });
}

// 如果是从用户端点击页脚的类型来的，就route带参数先根据参数搜索
if (route.query.type) {
  readTypeArticle(route.query.type);
}
let keyword = ref("");
function search() {
  let test = /^[\s\S]*.*[^\s][\s\S]*$/;
  api(
    `SELECT * from article  WHERE introduce LIKE '%${Base64.encode(
      keyword.value
    )}%' and isShow=1 ORDER by time DESC;`
  ).then((res) => {
    articleData.value = res.res;
    if (!test.test(keyword.value)) {
      ElMessage({
        message: "检测到你未输入关键词，为您查询所有文章",
        type: "success",
      });
    }
  });
}
</script>
<style scoped lang='scss'>
header {
  margin-top: 20px;
  margin-left: 50px;
  .search-text {
    width: 400px;
    height: 40px;
  }
  .search-button {
    margin-left: 20px;
  }
}
nav {
  margin-top: 10px;
  margin-left: 50px;
  .el-tag {
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      background: #daebff;
    }
  }
}

.box {
  padding: 5px 0px;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #fff;
}
.article-head {
  height: 50px;
  line-height: 50px;
  .article-title {
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
</style>