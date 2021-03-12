<template>
  <el-select
    multiple
    size="medium"
    v-model="types"
    placeholder="请选择"
    @change="getType"
  >
    <el-option
      v-for="item in options"
      :key="item.type"
      :label="item.type"
      :value="item.type"
    >
    </el-option>
  </el-select>
</template>
<script setup>
import { ref, defineEmit, defineProps, onUpdated} from "vue";
import readType from "@/modules/type/read-type";

let props = defineProps({
  setType: String,
});

let options = ref([]);
let types = ref([]); //文章类型
readType().then((res) => {
  options.value = res.data;
});

/*
 !更新次数过多会报错，用一个变量控制只修改一次
*/
let isUpdata = true;
onUpdated(() => {
  if (props.setType && isUpdata) {
    types.value = props.setType.indexOf(",") == -1 ? [props.setType] : props.setType.split(",");
    isUpdata = false;
  }
});

const emit = defineEmit();
function getType() {
  emit("getType", Object.values(types.value).join(","));
}
</script>
<style scoped lang='scss'>
.el-select {
  margin: 0px !important;
  width: 350px;
}
</style>