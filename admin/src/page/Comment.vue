<template>
  <header>
    <el-checkbox
      v-for="(item, index) in screen"
      :key="`screen-${item.title}-${item.name}`"
      v-model="item.value"
      :label="item.title"
      :name="item.name"
      size="large"
    />
  </header>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item
      v-for="item in tableData"
      :key="item.id"
      :title="`${item.commentator}--${item.articleId || '评论区'}--${item.time}`"
      :name="item.id"
    >
      <el-descriptions border size="large">
        <el-descriptions-item label="用户邮箱">
          {{ item.commentator }}
        </el-descriptions-item>
        <el-descriptions-item label="发布位置">
          <div v-if="item.articleId">
            文章:<router-link :to="`/article/${item.articleId}`">{{ item.articleId }}</router-link>
          </div>
          <div v-else>评论区</div>
        </el-descriptions-item>
        <el-descriptions-item label="评论时间">
          <el-date-picker readonly v-model="item.time" type="datetime" placeholder="评论时间" />
        </el-descriptions-item>
        <el-descriptions-item label="操作" align="center">
          <el-button type="danger" @click="remove(item.id)">删除</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="内容">
          <el-input
            v-model="item.content"
            maxlength="200"
            readonly
            rows="6"
            placeholder="网站介绍"
            show-word-limit
            type="textarea"
          />
        </el-descriptions-item>
        <el-descriptions-item label="回复" align="center">
          <el-input
            v-model="item.reply"
            rows="6"
            placeholder="回复"
            show-word-limit
            type="textarea"
          />
          <el-button
            type="primary"
            style="display: block; width: 100%; margin-top: 10px"
            @click="reply(item)"
            >回复</el-button
          >
        </el-descriptions-item>
      </el-descriptions>
    </el-collapse-item>
  </el-collapse>
</template>
<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

let screen = ref([
  {
    title: "只查看管理员",
    name: "admin",
    value: false,
    handle: val => val.commentator == "admin",
  },
  {
    title: "排除管理员",
    name: "admin",
    value: false,
    handle: val => val.commentator != "admin",
  },
  {
    title: "查看10天之内的评论",
    name: "time",
    value: false,
    handle: val => +new Date(val.time) > +new Date() - 864_000_000,
  },
  {
    title: "查看3天之内的评论",
    name: "time",
    value: false,
    handle: val => +new Date(val.time) > +new Date() - 259_200_000,
  },
]);

let data = ref([]);
let activeName = ref("");
let tableData = computed(() =>
  data.value.filter(item => {
    return screen.value.every(_item => {
      return _item.value ? _item.handle(item) : true;
    });
  })
);
axios.get("/comment").then(res => {
  data.value = res.data.data;
});

function remove(id) {
  axios.delete(`/comment/${id}`).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      data.value.splice(
        data.value.findIndex(item => item.id == id),
        1
      );
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

function reply(params) {
  axios
    .post("/comment", {
      articleId: params.articleId,
      superior: params.id,
      content: params.reply,
    })
    .then(res => {
      if (res.data.success) {
        ElMessage.success("回复成功");
        data.value.find(item => item.id == params.id).reply = "";
      } else {
        ElMessage.error("回复失败");
      }
    });
}
</script>
<style scoped lang="scss"></style>
