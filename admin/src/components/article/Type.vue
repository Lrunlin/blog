<template>
  <el-select v-model="type" multiple placeholder="请选择">
    <el-option
      v-for="item in store.state.type.typeData"
      :key="item.type"
      :label="item.type"
      :value="item.type"
    >
    </el-option>
  </el-select>
</template>
<script setup>
import { ref, toRaw, watchEffect, onUnmounted } from "vue";
import { useStore } from "vuex";
let store = useStore();

if (!store.state.type.length) {
  store.dispatch("getType");
}
// todo 将store中的值转换为普通对象，在使用commit去修改
let type = ref(toRaw(store.state.type.type));

watchEffect(() => {
  store.commit("changeType", type.value);
});
watchEffect(() => {
  type.value = store.state.type.type;
});
onUnmounted(() => {
  store.commit("changeType", []);
});
</script>
<style scoped lang='scss'>
.el-select {
  width: 400px;
}
</style>