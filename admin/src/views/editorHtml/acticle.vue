<template>
  <editor></editor>
  <router-link to="/finish">
    <el-button type="success">
      <i class="el-icon-check"></i>
      完成
    </el-button>
  </router-link>
  <el-button type="primary">
    <i class="el-icon-picture-outline-round"></i>
    预览
  </el-button>
</template>
<script>
import { reactive, toRefs } from "vue";
import editor from "@/components/editor.vue";
export default {
  components: {
    editor,
  },
  setup() {
    return {};
  },
};
</script>
<style scoped lang='scss'>
.el-button {
  margin-top: 20px;
  margin-left: 20px;
}
</style>