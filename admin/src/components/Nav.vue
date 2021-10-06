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
        <el-icon :size="16"> <document-copy /> </el-icon>
        <span>文章获取</span>
      </template>
      <el-menu-item index="/create-copy">文章借鉴</el-menu-item>
      <el-menu-item index="/copy">任务查询</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon :size="16">
          <More />
        </el-icon>
        <span>系统设置</span>
      </template>
      <el-menu-item index="/os/data">系统信息</el-menu-item>
      <el-menu-item index="/updata-admin">修改密码</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
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

import { useRoute } from "vue-router";
let route = useRoute();
onMounted(() => {
  document.body.style.paddingLeft = "200px";
});
onUnmounted(() => {
  document.body.style.paddingLeft = "0px";
});
</script>
<style scoped lang='scss'>
.el-menu {
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
}
</style>
<style lang="scss">
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
</style>