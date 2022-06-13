<template>
    <el-form label-width="60px">
        <el-form-item label="名称">
            <el-input v-model="data.name" />
        </el-form-item>
        <el-form-item label="时间">
            <el-date-picker v-model="data.time" type="datetime" placeholder="修改发布时间" />
        </el-form-item>
        <el-form-item label="内容">
            <Editor v-model:setHTML="data.content" />
        </el-form-item>
        <el-form-item label>
            <el-button type="primary" @click="update">发布</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'

import axios from 'axios';
import Editor from '@/components/ApiEditor/index.vue';

const data = reactive({content:''})

let route = useRoute()
axios.get(`/api/${route.params.id}`).then(res => {
    Object.assign(data, res.data.data)
});

function update() {
    axios.put(`/api/${route.params.id}`, { ...data }).then(res => {
        if (res.data.success) {
            ElMessage.success(res.data.message)
        } else {
            ElMessage.error(res.data.message)
        }
    })
};





</script>
<style scoped lang='scss'>
.el-input,
.el-date-picker {
    width: 300px;
}
</style>
