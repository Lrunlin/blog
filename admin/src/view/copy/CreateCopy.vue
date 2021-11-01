<template>
  <div>如果你无法获取文章类型请使用插件：Allow CORS: Access-Control-Allow-Origin 进行跨域,以保证fetch正常请求</div>
  <div>因为思否反爬虫限制,该功能暂时无法在生产环境使用</div>
  <div>具体功能请在GitHub中下载使用puppetee+Chrome请求页面的抓取工具</div>
  <div v-html="robots" v-if="robots" @click="robots = false"></div>
  <el-form label-width="100px">
    <el-form-item label="文章类型">
      <el-select v-model="form.type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.text"
          :label="item.text"
          :value="item.href"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="个数">
      <el-input-number
        v-model="form.number"
        :min="1"
        :max="100"
        label="查询个数"
      />
    </el-form-item>
    <el-form-item label="禁止图片">
      <el-switch v-model="form.noImage" />
    </el-form-item>
    <el-form-item label="3年内的文章">
      <el-switch v-model="form.isTime" />
    </el-form-item>
    <el-form-item label="关键词">
      <el-input v-model="form.keyword" placeholder="文章内必须包含本关键词" />
    </el-form-item>
    <el-form-item label="禁用词">
      <el-input v-model="form.disable" placeholder="文章内不能包含本关键词" />
    </el-form-item>
    <el-button type="primary" @click="sendOption">开始抓取</el-button>
  </el-form>
</template>
<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import jquery from "jquery";
import { useRouter } from "vue-router";
import axios from "axios";
import fetchJsonp from "fetch-jsonp";

let router = useRouter();

let form = reactive({
  type: "",
  number: 10,
  noImage: true,
  isTime: true,
  keyword: "",
  disable: "",
});

// 虽然说抓了也没什么事情，但是最好还是看下robots
let robots = ref(false);
let options = ref([]);

function sendOption() {
  axios.post("/spider", { ...form }).then((res) => {
    if (res.data.success) {
      ElMessage.success("抓取成功");
      router.push("/copy");
    }
  });
}

fetch(`https://segmentfault.com/robots.txt?v${+new Date()}`)
  .then((res) => res.text())
  .then((res) => {
    if (res != localStorage.robots) {
      localStorage.robots = res;
      robots.value = res;
    }
  });

fetch(`https://segmentfault.com/tags?sort=hottest&page=1?v${+new Date()}`)
  .then((res) => res.text())
  .then((res) => {
    let data = [];
    jquery(res)
      .find("a.badge-tag")
      .each((index, item) => {
        data.push({
          text: jquery(item).text(),
          href: jquery(item).attr("href").replace("/t/", ""),
        });
      });
    options.value = data;
    form.type = data[0].href;
  });
</script>
<style scoped lang='scss'>
.el-form {
  width: 700px;
  margin: 0px auto;
  margin-top: 20px;
  .el-button {
    display: block;
    margin: 0px auto;
    margin-top: 20px;
  }
}
</style>