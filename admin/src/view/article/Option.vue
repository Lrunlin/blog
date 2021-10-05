<template>
  <el-form label-width="80px">
    <el-form-item label="文章路由">
      <el-input v-model="form.router" placeholder="文章路由（选填）"></el-input>
    </el-form-item>
    <el-form-item label="文章标题">
      <el-input v-model="form.title" placeholder="文章标题（必填）"></el-input>
    </el-form-item>
    <el-form-item label="文章类型"> <Type /> </el-form-item>
    <el-form-item label="权限配置">
      <div>
        <span>是否置顶</span>
        <el-switch v-model="form.isTop"></el-switch>
        <span>是否展示</span>
        <el-switch v-model="form.isShow"></el-switch>
      </div>
    </el-form-item>
    <el-form-item label="文章介绍">
      <el-input
        class="el-input"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="form.introduce"
      />
    </el-form-item>
    <div class="button_container">
      <el-button
        type="primary"
        @click="
          () => {
            notEmpty ? create() : ElMessage.error('请将内容填写完整');
          }
        "
        >发布文章</el-button
      >
    </div>
  </el-form>
</template>
<script setup>
import { ref, reactive, toRaw, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import Type from "@/components/article/Type.vue";
import moveImages from "@/modules/moveImage.js";
import encodeHtml from "@/modules/encodeHtml.js";
import axios from "axios";

let router = useRouter();
let store = useStore();

let form = reactive({
  article: "",
  router: "",
  type: "",
  introduce: "",
  title: "",
  isTop: false,
  isShow: true,
});

// 判断非空
let notEmpty = computed(() => {
  let _ref = { ...form }; //触发响应式
  let testForm = JSON.parse(JSON.stringify(form));
  testForm.article = store.state.html;
  testForm.type = store.state.type.type;
  testForm.router = "router"; //router不校验写一个让他非空
  let test = Object.values(testForm).every((item) => {
    if (Array.isArray(item)) {
      return !!item.length;
    } else if (typeof item == "string") {
      return /^[\s\S]*.*[^\s][\s\S]*$/.test(item);
    } else {
      return /^[\s\S]*.*[^\s][\s\S]*$/.test(JSON.stringify(item));
    }
  });
  return test;
});

function create() {
  //处理数据
  let formData = toRaw(form);
  if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(formData.router)) {
    formData.router = +new Date();
  }
  formData.type = store.state.type.type;
  let article = encodeHtml(store.state.html, formData.type);
  formData.article = article;
  //请求
  axios.post(`/article`, { ...formData }).then((res) => {
    if (res.data.success) {
      moveImages(article); //移动使用到的图片
      //清除富文本中的字符串、清除保存的文章数据
      ElMessage.success("添加成功");
      store.commit("setHtml", "");
      store.commit("resetPageData");
      router.push("/");
    } else {
      ElMessage.error("添加失败");
    }
  });
}
</script>
<style scoped lang='scss'>
.el-form {
  width: 700px;
  margin: 0px auto;
  margin-top: 20px;
  .el-switch {
    margin: 0px 5px;
  }
  .el-input,
  .el-select {
    width: 600px !important;
  }
}
.button_container {
  margin-top: 40px;
  text-align: center;
  .el-button {
    width: 200px;
  }
}
</style>