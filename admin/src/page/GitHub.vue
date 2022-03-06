<template>
  <div class="tool">
    <el-button type="primary" @click="mode = 'create'">添加</el-button>
  </div>
  <el-table :data="data" style="width: 100%">
    <el-table-column label="#" width="80">
      <template v-slot="scope">{{ scope.$index + 1 }}</template>
    </el-table-column>
    <el-table-column prop="name" label="项目名称" width="180" />
    <el-table-column prop="url" label="项目地址" width="200" />

    <el-table-column label="预览图片">
      <template v-slot="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="setImageSrc(scope.row.id)"
          :preview-src-list="[setImageSrc(scope.row.id)]"
        />
      </template>
    </el-table-column>

    <el-table-column label="项目说明">
      <template v-slot="scope">
        <el-tooltip effect="dark" :content="scope.row.description" placement="top-start">
          <el-button>说明</el-button>
        </el-tooltip>
      </template>
    </el-table-column>

    <el-table-column label="操作" width="180">
      <template v-slot="scope">
        <el-button type="primary" :icon="Edit" circle @click="setEdit(scope.$index)"></el-button>
        <el-button type="danger" :icon="Delete" circle @click="remove(scope.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <GitHubDialog v-model:mode="mode" v-model:data="activeGitHubData" @update="dataKey++" />
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { ElMessage } from "element-plus";
import { Edit, Delete } from "@element-plus/icons";
import axios from "axios";
import GitHubDialog from "@/components/GitHubDialog.vue";
function setImageSrc(name) {
  return `${axios.defaults.baseURL}/image/github/${name}.webp`;
}
let data = ref([]);
let dataKey = ref(0); //通过dateKey控制请求刷新
watchEffect(() => {
  let key = dataKey.value;
  axios.get("/github").then(res => {
    data.value = res.data.data;
  });
});

/** 是否展示弹出层 弹窗中表单事件执行的模式（更新/创建）*/
let mode = ref(false);
/** 被选中数据的详细信息*/
let activeGitHubData = ref({});
//编辑数据、打开弹窗
function setEdit(index) {
  mode.value = "update";
  activeGitHubData.value = Object.assign({}, data.value[index]);
}


function remove(id) {
  axios.delete(`/github/${id}`).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      dataKey.value++;
    } else {
      ElMessage.error(res.data.message);
    }
  });
}



</script>
<style scoped lang="scss">
.tool {
  margin: 20px 0px;
  padding-left: 10px;
}

</style>
