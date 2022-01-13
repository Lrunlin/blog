<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="commentator" label="评论用户" width="180" />
        <el-table-column prop="content" label="内容" width="180">
            <template v-slot="scope">
                <el-popover
                    placement="top-start"
                    :width="200"
                    trigger="hover"
                    :content="scope.row.content"
                >
                    <template #reference>
                        <el-button>内容查看</el-button>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column prop="content" label="评论位置" width="180">
            <template v-slot="scope">
                <span>{{ scope.row.articleId || '评论区' }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="time" label="评论时间" />

        <el-table-column label="回复" width="180">
            <template v-slot="scope">
                <el-popover placement="bottom" :width="400" trigger="hover">
                    <el-input v-model="scope.row.reply" placeholder="回复此评论" clearable />
                    <el-button type="primary" @click="reply(scope)">确定回复</el-button>
                    <template #reference>
                        <span>回复</span>
                    </template>
                </el-popover>
            </template>
        </el-table-column>

        <el-table-column label="删除" width="180">
            <template v-slot="scope">
                <el-button
                    type="danger"
                    :icon="Delete"
                    circle
                    @click="remove(scope.row.id, scope.$index)"
                ></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { Delete } from '@element-plus/icons'

let tableData = ref([]);
axios.get('/comment').then(res => {
    tableData.value = res.data.data;
})

function remove(id, index) {
    axios.delete(`/comment/${id}`).then(res => {
        if (res.data.success) {
            ElMessage.success(res.data.message)
            tableData.value.splice(index, 1)
        } else {
            ElMessage.error(res.data.message)
        }
    })
};


function reply(scope) {
    axios.post('/comment', { articleId: scope.row.articleId, superior: scope.row.id, content: scope.row.reply }).then(res => {
        if (res.data.success) {
            ElMessage.success('回复成功');
            tableData.value[scope.$index].reply = '';
        } else {
            ElMessage.error('回复失败');
        }
    })
};
</script>
<style scoped lang='scss'>
</style>