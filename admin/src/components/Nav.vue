<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    :default-active="route.path || '/'"
    text-color="#fff"
    router
    :collapse="isCollapse"
    :unique-opened="true"
  >
    <li class="el-menu-item" @click="isCollapse = !isCollapse">
      <el-icon>
        <Refresh />
      </el-icon>
      <span>收起</span>
    </li>
    <el-menu-item index="/">
      <el-icon>
        <HomeFilled />
      </el-icon>
      <span>详情</span>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <Reading />
        </el-icon>
        <span>文章</span>
      </template>
      <el-menu-item index="/article">
        <span>文章管理</span>
      </el-menu-item>
      <el-menu-item index="/create-article">
        <span>发布文章</span>
      </el-menu-item>
      <!-- <el-menu-item index="/tube">
        <span>导出/导入</span>
      </el-menu-item> -->
    </el-sub-menu>
    <el-menu-item index="/github">
      <el-icon>
        <Box />
      </el-icon>
      <span>GitHub仓库信息</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <el-icon>
        <message-box />
      </el-icon>
      <span>评论</span>
    </el-menu-item>
    <el-menu-item index="/type">
      <el-icon>
        <help-filled />
      </el-icon>
      <span>文章类型</span>
    </el-menu-item>
    <el-menu-item index="/assets">
      <el-icon>
        <PictureFilled />
      </el-icon>
      <span>图片资源</span>
    </el-menu-item>
    <el-menu-item index="/links">
      <el-icon>
        <Link />
      </el-icon>
      <span>友链</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <Share />
        </el-icon>
        <span>开放API</span>
      </template>
      <el-menu-item index="/create-api">发布API接口</el-menu-item>
      <el-menu-item index="/api">API发布情况</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/password">
      <el-icon><Setting /></el-icon>
      <span>修改密码</span>
    </el-menu-item>
  </el-menu>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import {
  HomeFilled,
  Refresh,
  MessageBox,
  PictureFilled,
  Box,
  HelpFilled,
  Reading,
  Share,
  Setting,
  Link,
} from "@element-plus/icons";

let route = useRoute();
let isCollapse = ref(false);

onMounted(() => {
  document.body.classList.add("transition");
});

onUnmounted(() => {
  document.body.classList.remove("nav-active");
  document.body.classList.remove("transition");
});

watchEffect(() => {
  if (isCollapse.value) {
    document.body.classList.remove("nav-active");
    document.body.classList.add("nav-active_collapse");
  } else {
    document.body.classList.add("nav-active");
    document.body.classList.remove("nav-active_collapse");
  }
});
</script>
<style scoped lang="scss">
.el-menu {
  height: 100vh;
  position: fixed;
  left: 0px;
  top: 0px;
}
.el-sub-menu .el-menu-item {
  min-width: auto;
}
</style>
<style lang="scss">
.transition {
  transition: 0.4s;
}
.nav-active {
  padding-left: 180px !important;
}
.nav-active_collapse {
  padding-left: 71px !important;
}
</style>
