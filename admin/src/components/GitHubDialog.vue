<template>
  <div></div>
  <el-dialog
    v-model="dialogData.isShow"
    top="5vh"
    :before-close="clear"
    :lockScroll="false"
    :title="dialogData.title"
  >
    <el-form :model="data" label-width="120px">
      <el-form-item label="项目名称">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="仓库地址">
        <el-input v-model="data.url"></el-input>
      </el-form-item>
      <el-form-item label="仓库说明">
        <el-input v-model="data.description" type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="上传图片">
        <input
          type="file"
          id="githubImage"
          style="display: none"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          @change="loadImage"
        />
        <label for="githubImage" class="el-upload">
          <img v-if="imageUrl" :src="imageUrl" />
          <el-icon v-else><plus /></el-icon>
        </label>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="props.mode == 'update'" @click="update">更新</el-button>
        <el-button type="primary" v-if="props.mode == 'create'" @click="create">创建</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { Plus } from "@element-plus/icons";
let emit = defineEmits(["update:mode", "update:data", "update"]);
let props = defineProps({
  mode: {
    type: [String, Boolean],
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

let dialogData = computed(() => {
  return { isShow: !!props.mode, title: props.mode == "update" ? "修改仓库信息" : "创建仓库" };
});

let imageUrl = ref(false);
let data = ref({});
watch(props, newValue => {
  if (newValue.mode == "update") {
    imageUrl.value = `${axios.defaults.baseURL}/image/github/${props.data.id}.webp`;
  } else if (newValue.mode == "create") {
    imageUrl.value = false;
  }
  if (newValue.mode) {
    data.value = props.data;
  }
});

function update() {
  let _form = new FormData();
  if (document.getElementById("githubImage")) {
    _form.append("image", document.getElementById("githubImage").files[0]);
  }
  _form.append("name", data.value.name);
  _form.append("description", data.value.description);
  _form.append("url", data.value.url);

  let _time = +new Date(data.value.time);
  _form.append("time", new Date(_time + 1000));

  axios.put(`/github/${data.value.id}`, _form).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      emit("update");
      close();
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

function create() {
  let _form = new FormData();
  _form.append("image", document.getElementById("githubImage").files[0]);
  _form.append("name", data.value.name);
  _form.append("description", data.value.description);
  _form.append("url", data.value.url);

  axios.post("/github", _form).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      emit("update");
      close();
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

function close() {
  emit("update:mode", false);
  emit("update:data", {});
}
/** 关闭弹窗*/
function clear(done) {
  close();
  done();
}
/** 图片上传成功*/
function loadImage() {
  let dom = document.getElementById("githubImage");
  imageUrl.value = window.URL.createObjectURL(dom.files[0]);
}
</script>
<style scoped lang="scss">
.el-upload {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    border-color: #409eff;
  }

  img {
    width: 100%;
    height: 100%;
  }
  .el-icon {
    font-size: 28px;
    color: #8c939d;
  }
}
</style>
