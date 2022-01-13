<template>
    <el-form label-width="60px">
        <el-form-item label="名称">
            <el-input v-model="data.name" />
        </el-form-item>
        <el-form-item label="内容">
            <Editor v-model:setHTML="data.content" />
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" @click="create">发布</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

import axios from 'axios';
import Editor from '@/components/ApiEditor/index.vue';

let router = useRouter();
const data = reactive({ name: '', content: '' })


function create() {
    axios.post('/api', { name: data.name, content: data.content }).then(res => {
        if (res.data.success) {
            ElMessage.success(res.data.message)
            router.push('/api')
        } else {
            ElMessage.error(res.data.message)
        }
    })
}




</script>
<style scoped lang='scss'>
.el-input,
.el-date-picker {
    width: 300px;
}
</style>
