<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="#" width="60">
      <template v-slot="scope">
        <b>{{ scope.$index + 1 }}</b>
      </template>
    </el-table-column>

    <el-table-column label="图片" width="220">
      <template v-slot="scope">
        <el-image
          :hide-on-click-modal="true"
          style="width: 100px"
          :src="`${assets}/${scope.row.type}/${scope.row.name}${scope.row.id}`"
          :previewSrcList="[`${assets}/${scope.row.type}/${scope.row.name}`]"
          lazy
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column label="类型" width="80">
      <template v-slot="scope">
        <el-icon v-if="scope.row.type == 'image'">
          <Notebook />
        </el-icon>
        <el-icon v-else>
          <UserFilled />
        </el-icon>
      </template>
    </el-table-column>

    <el-table-column label="创建时间" width="280">
      <template v-slot="scope">
        <el-date-picker v-model="scope.row.time" readonly type="datetime" />
      </template>
    </el-table-column>

    <el-table-column prop="size" sortable label="图片大小" width="120" />
    <el-table-column label="删除" width="120">
      <template v-slot="scope">
        <el-popconfirm
          title="确定删除该图片？"
          @confirm="remove(scope.row.type, scope.row.name, scope.$index)"
        >
          <template #reference>
            <el-button type="danger" :icon="Delete" size="small"></el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>

    <el-table-column label="替换">
      <template v-slot="scope">
        <el-upload
          v-if="scope.row.type == 'image'"
          :ref="scope.row.name"
          name="image"
          :limit="1"
          :action="`${assets}/assets/${scope.row.name}`"
          :auto-upload="false"
          method="put"
          :headers="{ authorization: store.state.token }"
          :on-success="reload"
          accept="image/jpeg,image/png,image/webp"
        >
          <template #trigger>
            <el-button size="small" type="primary" :disabled="scope.row.type == 'face'"
              >选择</el-button
            >
          </template>
          <el-button
            style="margin-left: 10px"
            @click="upload(scope.row.name)"
            size="small"
            :disabled="scope.row.type == 'face'"
            type="success"
            >确定上传</el-button
          >
        </el-upload>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    @current-change="switchPage"
    background
    layout="prev, pager, next"
    :total="data.length"
  ></el-pagination>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { Delete, UserFilled, Notebook } from "@element-plus/icons";

let store = useStore();

const assets = store.state.assets;
let data = ref([]);

let tableData = ref([]);
axios.get(`${assets}/assets`).then(res => {
  data.value = res.data.data.map(item => Object.assign(item, { id: "" }));
  tableData.value = res.data.data.slice(0, 10);
});

function remove(dir, name, index) {
  axios.delete(`${assets}/assets/${dir}/${name}`, { params: { images: [name] } }).then(res => {
    if (res.data.success) {
      tableData.value.splice(index, 1).slice(0, 10);
      ElMessage.success("删除成功");
    } else {
      ElMessage.error("删除成功");
    }
  });
}

//todo 上传成功后根据返回的参数更新图片版本号来刷新
function reload(res) {
  tableData.value.find(item => item.name == res.data).id = `?v${+new Date()}`;
}

function switchPage(page) {
  tableData.value = data.value.slice((page - 1) * 10, page * 10);
}
</script>
<script>
export default {
  methods: {
    upload(refId) {
      this.$refs[refId].submit();
    },
  },
};
</script>
<style scoped>
.el-pagination {
  text-align: center;
  margin: 20px 0px;
}
</style>
