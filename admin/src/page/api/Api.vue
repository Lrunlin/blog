<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="Api" width="180" />
        <el-table-column prop="time" label="发布时间" width="180" />
        <el-table-column prop="address" label="删除">
            <template v-slot="scope">
                <el-button type="danger" @click="beforeRemove(scope)" :icon="Delete" circle></el-button>
            </template>
        </el-table-column>
        <el-table-column label="去修改">
            <template v-slot="scope">
                <el-button type="primary" :icon="Edit" circle @click="link(scope.row.id)"></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus'
import {
    Edit,
    Delete,
} from '@element-plus/icons';
import axios from 'axios';
let router = useRouter();


let tableData = ref([]);
axios.get('/api').then(res => {
    tableData.value = res.data.data.list;
});

function remove(id, index) {
    axios.delete(`/api/${id}`).then(res => {
        if (res.data.success) {
            ElMessage.success(res.data.message)
            tableData.value.splice(index, 1)
        } else {
            ElMessage.error(res.data.message)
        }
    })
};


function beforeRemove(scope) {
    ElMessageBox.confirm(
        `确定删除 ${scope.row.name}?`,
        '确定删除？',
        {
            confirmButtonText: '删除',
            cancelButtonText: '不删了',
            type: 'warning',
        }
    )
        .then(() => {
            remove(scope.row.id, scope.$index)
        })
}






function link(id) {
    router.push(`/api/${id}`)
}


</script>
<style scoped lang='scss'>
</style>
