<template>
  <el-collapse v-model="isCreateOpen" @change="val => (isCreateOpen = val)">
    <el-collapse-item title="添加友链" name="1">
      <div style="margin-top: 10px">
        是否引流:
        <el-switch v-model="form.drainage" />
      </div>
      <el-input v-model="form.name" maxlength="100" placeholder="网站名称" />
      <el-input v-model="form.url" maxlength="100" placeholder="网站地址" />
      <el-input v-model="form.logo" maxlength="100" placeholder="Logo地址" />
      <el-input v-model="form.description" maxlength="200" placeholder="网站介绍" />
      <el-button type="primary" @click="create">添加</el-button>
    </el-collapse-item>
  </el-collapse>

  <el-descriptions v-for="(item, index) in data" :key="item.id" border size="large">
    <el-descriptions-item label="网址名称">
      <el-input v-model="item.name" maxlength="100" placeholder="网站名称" />
    </el-descriptions-item>
    <el-descriptions-item label="引流">
      <el-switch v-model="item.drainage" />
    </el-descriptions-item>
    <el-descriptions-item label="URL" class-name="write-box">
      <el-input v-model="item.url" maxlength="100" placeholder="网址" />
      <el-link :href="item.url" target="_blank" class="ml-10">前往</el-link>
    </el-descriptions-item>
    <el-descriptions-item label="详情">
      <el-input
        v-model="item.description"
        maxlength="100"
        rows="4"
        placeholder="网站介绍"
        show-word-limit
        type="textarea"
      />
    </el-descriptions-item>
    <el-descriptions-item label="Logo" class-name="write-box">
      <el-input v-model="item.logo" maxlength="100" placeholder="Logo地址" />
      <el-image
        :src="item.logo"
        class="links-logo ml-10"
        alt="友链Logo"
        :preview-src-list="[item.logo]"
        :hide-on-click-modal="true"
      />
    </el-descriptions-item>

    <el-descriptions-item label="添加时间">
      <el-date-picker v-model="item.time" type="datetime" placeholder="发布时间" />
    </el-descriptions-item>
    <el-descriptions-item label="操作" align="center">
      <div class="btns">
        <el-button type="primary" @click="update(item)">修改</el-button>
        <el-button type="danger" @click="remove(item, index)">删除</el-button>
      </div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

let isCreateOpen = ref(0);
let data = ref("");

let key = ref(0);
watchEffect(() => {
  let _key = key.value;
  axios.get("/links").then(res => {
    data.value = res.data.data;
  });
});

let form = ref({ name: "", url: "", logo: "", description: "", drainage: true });

function create() {
  if (!Object.values(form.value).every(item => /^[\s\S]*.*[^\s][\s\S]*$/.test(item))) {
    ElMessage.warning("请将内容填写完整");
    return false;
  }
  axios.post("/links", form.value).then(res => {
    if (res.data.success) {
      key.value++;
      ElMessage.success(res.data.message);
      form.value = { name: "", url: "", logo: "", description: "", drainage: true };
    } else {
      ElMessage.error(res.data.message);
    }
  });
}

function remove(item, index) {
  ElMessageBox.confirm(`确认删除友链: ${item.name}？`, "删除友链？", {
    confirmButtonText: "确认删除",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    axios.delete(`/links/${item.id}`).then(res => {
      if (res.data.success) {
        ElMessage.success("删除成功");
        data.value.splice(index, 1);
      } else {
        ElMessage.error("删除失败");
      }
    });
  });
}
function update(item) {
  ElMessageBox.confirm(`确认修改友链: ${item.name}？`, "修改友链？", {
    confirmButtonText: "修改",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    let { name, url, logo, time, description, drainage, id } = item;
    let _data = { name, url, logo, time, description, drainage };
    axios.put(`/links/${id}`, _data).then(res => {
      if (res.data.success) {
        ElMessage.success("修改成功");
        key.value++;
      } else {
        ElMessage.error("修改失败");
      }
    });
  });
}
</script>
<style scoped lang="scss">
.el-collapse {
  .el-input {
    margin-top: 10px;
  }
  .el-button {
    margin: 0px auto;
    margin-top: 30px;
    display: block;
    width: 60%;
  }
}
.el-descriptions {
  margin-top: 30px;
  .links-logo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: relative;
    top: 8px;
  }
}
</style>
<style lang="scss">
.el-descriptions {
  .btns {
    display: flex;
    justify-content: space-around;
    width: 100%;
    .el-button {
      width: 40%;
      display: block;
    }
  }
  .write-box {
    .el-input {
      width: calc(100% - 80px);
    }
  }
  .ml-10{
    margin-left: 10px;
  }
}
</style>
