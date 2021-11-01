<template>
  <el-menu
    :uniqueOpened="true"
    :defaultActive="route.path || '/'"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <li
      class="el-menu-item"
      @click="router.push('/sign')"
      title="点击登录，如果您已经登录此操作不会销毁您的登录凭证"
    >{{ signState }}</li>

    <el-sub-menu index="1">
      <template #title>
        <el-icon :size="16">
          <Notebook />
        </el-icon>
        <span>文章管理</span>
      </template>
      <el-menu-item index="/write">写文章</el-menu-item>
      <el-menu-item index="/article">文章详情</el-menu-item>
    </el-sub-menu>

    <el-menu-item index="/type">
      <el-icon :size="16">
        <Operation />
      </el-icon>
      <span>文章类型</span>
    </el-menu-item>
    <el-menu-item index="/message">
      <el-icon :size="16">
        <Comment />
      </el-icon>
      <span>留言处理</span>
    </el-menu-item>

    <el-menu-item index="/log">
      <el-icon :size="16">
        <Document />
      </el-icon>
      <span>日志</span>
    </el-menu-item>

    <el-menu-item index="/assets">
      <el-icon :size="16">
        <Folder />
      </el-icon>
      <span>静态资源</span>
    </el-menu-item>

    <el-menu-item index="/rss">
      <el-icon :size="16">
        <Position />
      </el-icon>
      <span>订阅列表</span>
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>
        <el-icon :size="16">
          <More />
        </el-icon>
        <span>系统设置</span>
      </template>
      <el-menu-item index="/os/data">系统信息</el-menu-item>
      <el-menu-item index="/updata-admin">修改密码</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon :size="16">
          <document-copy />
        </el-icon>
        <span>文章获取</span>
      </template>
      <el-menu-item index="/create-copy">文章借鉴</el-menu-item>
      <el-menu-item index="/copy">任务查询</el-menu-item>
    </el-sub-menu>

    <el-menu-item index="/comment">评论管理</el-menu-item>
  </el-menu>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from 'axios';

import {
  Notebook,
  Operation,
  Comment,
  More,
  DocumentCopy,
  Position,
  Document,
  Folder
} from "@element-plus/icons";
import { ElMessage } from 'element-plus';

import { useRoute, useRouter } from "vue-router";
let route = useRoute();
let router = useRouter();
onMounted(() => {
  document.body.style.paddingLeft = "200px";
});
onUnmounted(() => {
  document.body.style.paddingLeft = "0px";
});
let signState = ref('')
axios.get('/admin/state').then(res => {
  if (!res.data.success) {
    signState.value = '未登录'
  } else {
    signState.value = res.data.message
  };
  // ElMessage.success(res.data.message)
}).catch(error => {
  ElMessage.error('获取登录状态失败，您可能无法查看部分数据')
})







</script>
<style scoped lang='scss'>
.el-menu {
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
}
.el-sub-menu__title,
.el-menu-item {
  .el-sub-menu__title,
  .el-menu-item {
    display: flex !important;
    align-items: center;
    .el-icon {
      margin-right: 10px;
      position: relative;
      top: -2px;
    }
  }
}
</style>