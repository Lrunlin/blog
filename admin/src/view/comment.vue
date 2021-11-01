<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="头像" width="180">
            <template v-slot="scope">
                <el-avatar :size="50" :src="scope.row.face"></el-avatar>
            </template>
        </el-table-column>
        <el-table-column label="用户名" prop="name" width="180"></el-table-column>
        <el-table-column label="内容" width="180">
            <template v-slot="scope">
                <el-tooltip effect="dark" :content="scope.row.content" placement="top">
                    <div class="text">{{ scope.row.content }}</div>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" />
        <el-table-column label="操作">
            <template v-slot="scope">
                <el-button icon="el-icon-document-copy" circle @click="copyToken(scope.row.token)"></el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="remove(scope.row.id, scope.$index)"
                ></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="page" background layout="prev, pager, next" :total="total"></el-pagination>
    <input type="text" ref="tokenDom" v-model="token" style="position: absolute;top:-1000000px" />
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import axios from 'axios';
import { ElMessage } from 'element-plus'

let tableData = ref([]);
let page = ref(1);
let total = ref(0);
watchEffect(() => {
    axios.get(`/comment/page/${page.value}`).then(res => {
        tableData.value = res.data.data;
        total.value = res.data.total;
    })
})


function remove(id, index) {
    axios.delete(`/comment/${id}`).then(res => {
        ElMessage({
            message: res.data.message,
            type: res.data.success ? 'success' : 'error',
        });
        if (res.data.success) {
            tableData.value.splice(index, 1)
        }
    })
}
let tokenDom = ref(null);
let token = ref('');
function copyToken(value) {
    token.value = value;
    console.log(tokenDom.value);
    setTimeout(() => {
        tokenDom.value.select()
        document.execCommand('copy');
        ElMessage({
            message: '复制成功' + value,
            type: 'success',
        })
    }, 0);
}


</script>
<style scoped lang='scss'>
.text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.el-pagination {
    text-align: center;
    margin: 10px 0px;
}
</style>