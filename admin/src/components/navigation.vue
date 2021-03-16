<template>
  <el-row :class="animate">
    <el-col>
      <el-menu
        :uniqueOpened="true"
        default-active="/"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-menu-item @click="zoom">
          <i class="el-icon-refresh"></i>
          <span>展开/关闭</span>
        </el-menu-item>
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-edit"></i>
            <span>代码编辑</span>
          </template>
          <el-menu-item index="/">编辑器</el-menu-item>
          <el-menu-item index="/previewPage" disabled=true>页面预览(待开发)</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template #title>
            <i class="el-icon-location"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item index="/read-article">文章查询</el-menu-item>
          <el-menu-item index="/type">
            文章类型管理
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
import { ref, onUnmounted } from "vue";
export default {
  setup() {
    document.body.style.paddingLeft = "200px"; //添加paddingLeft
    let isCollapse = ref(false); //是否伸缩
    let animate = ref(""); //设置导航栏动画
    function zoom() {
      isCollapse.value = !isCollapse.value;
      document.body.style.paddingLeft = isCollapse.value ? "65px" : "200px";
      animate.value = isCollapse.value ? "animate-zoom" : "";
    }
    onUnmounted(() => {
      document.body.style.paddingLeft = "0px";
    });
    return { isCollapse, zoom, animate };
  },
};
</script>
<style scoped lang='scss'>
.el-row {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh !important;
  background: #545c64;
  width: 200px;
  user-select: none;
}

.el-menu {
  // 有一白色的边框，去掉
  border-right: 0px !important;
}

// 动画：导航栏缩回
.animate-zoom {
  animation: zoom 0.3s forwards linear;
}
@keyframes zoom {
  0% {
  }
  100% {
    width: 65px;
  }
}
</style>
