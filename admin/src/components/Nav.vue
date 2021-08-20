<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        :uniqueOpened="true"
        :default-active="route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-menu-item index="/">
          <i class="el-icon-house"></i>
          首页</el-menu-item
        >
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-notebook-1"></i>
            <span>文章处理</span>
          </template>
          <el-menu-item index="/writer">写文章</el-menu-item>
          <el-menu-item index="/read-article">文章展示</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template #title>
            <i class="el-icon-notebook-2"></i>
            <span>记事本</span>
          </template>
          <el-menu-item index="/message">词条</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template #title>
            <i class="el-icon-s-check"></i>
            <span>文章类型</span>
          </template>
          <el-menu-item index="/type">类型</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template #title>
            <i class="el-icon-s-data"></i>
            <span>文章分析</span>
          </template>
          <el-menu-item index="/type-analysis">类型分析</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup>
import { onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import jsCookie from "js-cookie";
let router = useRouter();
let route = useRoute();
let store = useStore();
onMounted(() => {
  document.body.style.paddingLeft = "200px";
});
onUnmounted(() => {
  document.body.style.paddingLeft = "0px";
});
</script>
<style scoped lang='scss'>
.el-row {
  width: 200px;
  position: fixed;
  top: 0px;
  left: 0px;
}
.el-col,
.el-menu {
  height: 100vh;
}
</style>