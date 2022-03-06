<template>
  <el-dialog
    v-model="isShowDialog"
    :destroy-on-close="true"
    @closed="closeDialog"
    @open="type = data.type"
    :lockScroll="false"
    title="文本信息"
    width="30%"
  >
    <el-form label-width="100px">
      <el-form-item label="类型">
        <el-input v-model="data.type"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="data.isShow"></el-switch>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="data.time" type="datetime" placeholder="选择创建时间" />
      </el-form-item>
      <el-form-item label="上传">
        <input
          type="file"
          id="fileImage"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          style="display: none"
          @change="changeImage"
        />
        <label for="fileImage" class="el-upload">
          <img v-if="imageUrl" :src="imageUrl" />
          <el-icon v-else><Plus /></el-icon>
        </label>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button v-if="mode == 'create'" type="primary" @click="create">添加</el-button>
      <el-button v-else type="primary" @click="update">确认修改</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons";
import axios from "axios";
let url = axios.defaults.baseURL;

let router = useRouter();

let props = defineProps({
  mode: {
    type: [String, Boolean],
    required: true,
    default: "create",
  },
  data: {
    type: Object,
    required: true,
  },
});
let type = ref("");
let isShowDialog = ref(props.mode);
let data = ref("");
let imageUrl = ref(false);

watchEffect(() => {
  isShowDialog.value = !!props.mode;
  if (props.mode == "create") {
    data.value = {
      time: new Date(),
      type: "",
      isShow: true,
    };
  } else {
    data.value = Object.assign({}, props.data);
    imageUrl.value = `${url}/image/type/${props.data.type}.webp`;
  }
});
let emit = defineEmits();
function closeDialog() {
  emit("update:data", {});
  emit("update:mode", false);
}

function create() {
  let _form = new FormData();
  _form.append("type", data.value.type);
  _form.append("time", data.value.time);
  _form.append("isShow", data.value.isShow);
  _form.append("image", document.getElementById("fileImage").files[0]);
  axios.post("/type", _form).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      router.go(0);
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

function update() {
  let _form = new FormData();
  _form.append("type", data.value.type);
  _form.append("time", data.value.time);
  _form.append("isShow", data.value.isShow);
  if (document.getElementById("fileImage").files[0]) {
    _form.append("image", document.getElementById("fileImage").files[0]);
  }
  axios.put(`/type/${type.value}`, _form).then(res => {
    if (res.data.success) {
      ElMessage.success(res.data.message);
      router.go(0);
    } else {
      ElMessage.error(res.data.message);
    }
  });
}
function changeImage() {
  let url = window.URL.createObjectURL(document.getElementById("fileImage").files[0]);
  imageUrl.value = url;
}
</script>
<style scoped lang="scss">
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 64px;
  height: 64px;
  &:hover {
    border-color: #409eff;
  }
  .el-icon {
    font-size: 16px;
    color: #8c939d;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
