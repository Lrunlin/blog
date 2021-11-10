<template>
  <!-- element-plus -->
  <el-form label-width="80px">
    <el-form-item label="添加类型">
      <el-input v-model="type" placeholder="填写文章类型"></el-input>
      <el-button type="primary" @click="create">添加</el-button>
    </el-form-item>
  </el-form>
  <!-- 显示的数据展示表格 -->
  <el-table :data="store.state.type.typeData" style="width: 100%">
    <el-table-column label="类型">
      <template v-slot="scope">
        <el-tooltip effect="dark" :content="`添加时间:${scope.row.time}`" placement="top">
          <span @click="activeType = scope.row.type">{{ scope.row.type }}</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="删除">
      <template v-slot="scope">
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="remove(scope.row.type, scope.$index)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 弹窗修改类型 -->
  <el-dialog v-model="activeType" title="确定修改文章类型？" width="30%">
    <span>
      修改
      <span style="font-weight: 700;">{{ activeType }}</span> 为：
    </span>
    <el-input v-model="updataType" placeholder="填写文章类型(禁止特殊字符)"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="activeType = false" type="danger">关闭</el-button>
        <el-button type="primary" :disabled="isDisabled" @click="updata">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import axios from 'axios';
import { ElMessage } from "element-plus";
let store = useStore();
if (!store.state.type.typeData.length) {
  store.dispatch("getType");
}

let type = ref("");
function create() {
  if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(type.value)) {
    ElMessage.error("请将内容填写完整");
    return false;
  }

  axios.post("/type", { type: type.value }).then((res) => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      store.commit("addType", type.value);
      type.value = "";
    } else {
      ElMessage.error(res.data.message);
    }
  });
}
function remove(type, index) {
  axios.delete(`/type/${type}`).then((res) => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      store.commit("removeType", index);
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

//判断弹窗中的确认按钮是否可以点击 ，要求非空并且没有特殊符号
let isDisabled = computed(() => {
  let isSymbol = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im.test(updataType.value)
  let isEmpty = !/^[\s\S]*.*[^\s][\s\S]*$/.test(updataType.value);
  return isSymbol || isEmpty;
});

let updataType = ref('');//修改类型的文本框中的值
let activeType = ref(false);
//关闭弹窗时清除输入框内容
watch(activeType, function (newValue) {
  if (!newValue) updataType.value = ""
})
function updata() {
  axios.put(`/type/${activeType.value}`, { type: updataType.value }).then(res => {
    ElMessage({
      message: res.data.message,
      type: res.data.success ? 'success' : 'error',
    })
    if (res.data.success) {
      activeType.value = false;
      store.dispatch("getType");
    }
  })
};

</script>
<style scoped lang='scss'>
.el-form {
  margin-top: 20px;
  .el-input {
    width: calc(100% - 200px);
  }
  .el-button {
    margin-left: 20px;
  }
}
</style>