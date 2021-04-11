<template>
  <el-input type="textarea" :rows="12" placeholder="请输入内容" v-model="fun">
  </el-input>
  <el-button @click="change">处理</el-button>
  <div class="alert" v-show="alertShow">{{ nowNum }}/{{ data.length }}</div>
  <div>
    <div>页面为批量修改元素dom，已经设置为HTML盒子的innerHTML变量为html</div>
    推荐复制：<pre>{{ title }}</pre>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import readArticle from "@/modules/article/read-article";
import { Base64 } from "js-base64";
import updataArticleText from "@/modules/article/update-article-text";
let data = ref([]);
let code = ref("");
readArticle({}).then((res) => {
  data.value = res.data;
});

let fun = ref("");
onMounted(() => {
  let div = document.createElement("div");
  div.id = "domHub";
  div.style.display = "none";
  document.body.append(div);
});
let num = 0;
let nowNum = ref(0);
let alertShow = ref(false);
function change() {
  alertShow.value = true;
  if (document.getElementById("changeDom")) {
    changeDom.innerHtml = code.value;
  } else {
    let script = document.createElement("script");
    script.id = "changeDom";
    script.innerHTML = `
    function changeDom() {
       let html =  document.getElementById("domHub").innerHTML;
       let box =  document.getElementById("domHub");
       ${fun.value}
    }`;
    document.head.append(script);
  }
  let timer;
  timer = setInterval(() => {
    if (data.value[num] == undefined) {
      alertShow.value = false;
      clearInterval(timer);
    } else {
      document.getElementById("domHub").innerHTML = Base64.decode(
        data.value[num].article
      );
      changeDom();
      updataArticleText({
        router: data.value[num].router,
        article: Base64.encode(document.getElementById("domHub").innerHTML),
      });
      num++;
      nowNum.value = num;
    }
  }, 500);
}
let title=`for (let i = 0; i < box.getElementsByTagName("img").length; i++) {
  box.getElementsByTagName('img')[i].style.color='red';
}`
</script>
<style scoped lang='scss'>
.function-box {
  width: 500px;
  height: 300px;
  outline: none;
  margin-left: 30px;
}
.alert {
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0, 0.3);
  position: fixed;
  top: 0px;
  left: 0px;
  line-height: 100vh;
  text-align: center;
  color: white;
  font-weight: 700;
  font-size: 26px;
}
// for (let i = 0; i < document.getElementById("domHub").getElementsByTagName("img").length; i++) {
//   document.getElementById("domHub").getElementsByTagName('img')[i].alt='我是修改的1';
//   document.getElementById("domHub").getElementsByTagName('img')[i].style.color='red';
// }
</style>