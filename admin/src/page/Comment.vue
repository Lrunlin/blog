<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item
      v-for="(item, index) in tableData"
      :key="item.id"
      :title="`${item.commentator}--${item.articleId || '评论区'}--${item.time}`"
      :name="item.id"
    >
      <el-descriptions border size="large">
        <el-descriptions-item label="用户邮箱">
          {{ item.commentator }}
        </el-descriptions-item>

        <el-descriptions-item label="发布位置">
          {{ item.articleId || "评论区" }}
        </el-descriptions-item>
        <el-descriptions-item label="评论时间">
          <el-date-picker disabled v-model="item.time" type="datetime" placeholder="评论时间" />
        </el-descriptions-item>
        <el-descriptions-item label="操作" align="center">
          <el-button type="danger" @click="remove(item.id, index)">删除</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="内容">
          <el-input
            v-model="item.content"
            maxlength="200"
            disabled
            rows="4"
            placeholder="网站介绍"
            show-word-limit
            type="textarea"
          />
        </el-descriptions-item>
        <el-descriptions-item label="回复" align="center">
          <el-input
            v-model="item.reply"
            rows="4"
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
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

let activeName = ref("");
let tableData = ref([]);
axios.get("/comment").then(res => {
  tableData.value = res.data.data;
});

function remove(id, index) {
  axios.delete(`/comment/${id}`).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      tableData.value.splice(index, 1);
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
        tableData.value.find(item => item.id == params.id).reply = "";
      } else {
        ElMessage.error("回复失败");
      }
    });
}
</script>
<style scoped lang="scss"></style>
