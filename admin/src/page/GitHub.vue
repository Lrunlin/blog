<template>
  <div class="tool">
    <el-button type="primary" @click="hideDialog = 'create'">添加</el-button>
  </div>
  <el-table :data="data" style="width: 100%">
    <el-table-column label="#" width="80">
      <template v-slot="scope">{{ scope.$index + 1 }}</template>
    </el-table-column>
    <el-table-column prop="name" label="项目名称" width="180" />
    <el-table-column prop="url" label="项目地址" width="200" />

    <el-table-column label="项目说明">
      <template v-slot="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="scope.row.image"
          :preview-src-list="[scope.row.image]"
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

  <!-- 弹窗修改信息 -->
  <el-dialog
    v-model="hideDialog"
    top="5vh"
    :before-close="
      done => {
        activeGitHubData = {};
        done();
      }
    "
    :lockScroll="false"
    :title="`${hideDialog == 'update' ? '修改仓库信息' : '创建仓库'}`"
  >
    <el-form :model="activeGitHubData" label-width="120px">
      <el-form-item label="项目名称">
        <el-input v-model="activeGitHubData.name"></el-input>
      </el-form-item>
      <el-form-item label="仓库地址">
        <el-input v-model="activeGitHubData.url"></el-input>
      </el-form-item>
      <el-form-item label="仓库说明">
        <el-input v-model="activeGitHubData.description" type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="开发语言">
        <el-select
          v-model="activeGitHubData.languages"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="选择开发语言"
          style="width: 100%"
        ></el-select>
      </el-form-item>

      <el-form-item label="上传图片">
        <el-upload
          name="image"
          :action="`${store.state.assets}/assets/github`"
          :headers="{
            authorization: store.state.token,
          }"
          :on-success="loadSuccess"
          accept="image/jpeg,image/jpg,image/png,image/webp"
        >
          <el-button size="small" type="primary">上传仓库展示图</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="hideDialog == 'update'" @click="update">更新</el-button>
        <el-button type="primary" v-if="hideDialog == 'create'" @click="create">创建</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { ElMessage } from "element-plus";
import { Edit, Delete } from "@element-plus/icons";
import axios from "axios";
import { useStore } from "vuex";
let store = useStore();

let data = ref([]);
let dataKey = ref(0); //通过dateKey控制请求刷新
watchEffect(() => {
  let key = dataKey.value;
  axios.get("/github").then(res => {
    data.value = res.data.data;
  });
});

/** 是否展示弹出层 弹窗中表单事件执行的模式（更新/创建）*/
let hideDialog = ref(false);
/** 被选中数据的详细信息*/
let activeGitHubData = ref({});
//编辑数据、打开弹窗
function setEdit(index) {
  hideDialog.value = "update";
  activeGitHubData.value = Object.assign({}, data.value[index]);
}

function update() {
  let _data = Object.assign({}, activeGitHubData.value);
  delete _data.id;

  axios.put(`/github/${activeGitHubData.value.id}`, _data).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      hideDialog.value = false;
      dataKey.value++;
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

function create() {
  axios.post("/github", { ...activeGitHubData.value }).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      hideDialog.value = false;
      dataKey.value++;
    } else {
      ElMessage.error(res.data.message);
    }
  });
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

/** 图片上传成功*/
function loadSuccess(res) {
  activeGitHubData.value.image = res.data;
  ElMessage.success("上传成功");
}

function clear(done) {
  activeGitHubData.value = {};
  done();
}
</script>
<style scoped lang="scss">
.tool {
  margin: 20px 0px;
  padding-left: 10px;
}
</style>
