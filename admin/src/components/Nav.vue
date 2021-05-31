<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        :uniqueOpened="true"
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-notebook-1"></i>
            <span>文章处理</span>
          </template>
          <el-menu-item index="/writer">写文章</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
onMounted(() => {
  document.body.style.paddingLeft = "200px";
});
onUnmounted(() => {
  document.body.style.paddingLeft = "200px";
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