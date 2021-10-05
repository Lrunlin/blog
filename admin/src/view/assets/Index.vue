<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="图片" width="180">
      <template v-slot="scope">
        <!-- 一定要使用懒加载 -->
        <el-image
          @click="showImage(`${store.state.assetsapi}/image/${scope.row.name}`)"
          :src="`${store.state.assetsapi}/image/${scope.row.name}`"
          lazy
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="size" label="文件大小" width="180" />
    <el-table-column prop="time" label="创建时间" />
    <el-table-column label="删除">
      <template v-slot="scope">
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="removeImage = [scope.row.name]"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="layer" @click="showImageUrl = false" v-if="showImageUrl">
    <div>
      <img
        :src="showImageUrl"
        alt=""
        @mousewheel.prevent="rollImg"
        @click.stop=""
      />
    </div>
  </div>

  <el-dialog
    v-model="removeImage.length"
    title="确定要删除这张图片吗？被删除的图片无法恢复"
    width="30%"
  >
    <p>
      <img
        :src="`${store.state.assetsapi}/image/${removeImage[0]}`"
        style="width: 50%"
      />
    </p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="removeImage = []">不删了</el-button>
        <el-button type="danger" @click="remove">确认删除</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

let store = useStore();
let tableData = ref([]);
axios.get(`${store.state.assetsapi}/assets`).then((res) => {
  tableData.value = res.data.data;
});

/*
todo 设置图片查看
?设置打开时的动画效果
@param url 图片地址
*/
let showImageUrl = ref(false);
function showImage(url) {
  showImageUrl.value = url;
}
// todo 处理图片缩放
let zoom = ref(1);
function rollImg(e) {
  if (e.wheelDelta > 0) {
    if (zoom.value < 1.2) zoom.value += 0.1;
  } else {
    if (zoom.value > 0.5) zoom.value -= 0.1;
  }
}

let removeImage = ref([]);
function remove() {
  axios
    .delete(`${store.state.assetsapi}/assets`, {
      params: {
        images: removeImage.value,
      },
    })
    .then((res) => {
      if (res.data.success) {
        ElMessage.success("删除成功");
        let index = tableData.value.findIndex(
          (item) => item.name == removeImage.value[0]
        );
        tableData.value.splice(index, 1);
        removeImage.value = [];
      } else {
        ElMessage.error("删除失败");
      }
    });
}
</script>
<style scoped lang='scss'>
.layer {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99999999 !important;
  text-align: center;
  line-height: 100vh;
  div {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  img {
    //我记得zoom不兼容火狐，最好别用，也懒得试
    //style-var提案 可能会修改
    width: 60vw;
    transform: scale(v-bind(zoom));
  }
}
</style>