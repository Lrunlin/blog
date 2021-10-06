<template>
    <div class="form">
        <el-input v-model="password" placeholder="请输入新密码" />
        <el-button
            type="primary"
            @click="dialogVisible = true"
            :disabled="!/^[\s\S]*.*[^\s][\s\S]*$/.test(password)"
        >修改密码</el-button>
    </div>
    <el-dialog v-model="dialogVisible" title="您正在修改密码!!" width="30%">
        <h3>确定将密码修改为： {{ password }}?</h3>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">不改了</el-button>
                <el-button type="primary" @click="changePassword">确认修改</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';

let router = useRouter()

let password = ref('');
let dialogVisible = ref(false)

function changePassword() {
    axios.put('/admin', { password: password.value }).then(res => {
        if (res.data.success) {
            ElMessage.success('修改成功');
            localStorage.removeItem('token');
            dialogVisible.value = false;
            router.replace('/sign')
        } else {
            ElMessage.error('修改失败')
            dialogVisible.value = false;
        }
    })
}




</script>
<style scoped lang='scss'>
.form {
    display: flex;
    margin: 0px auto;
    margin-top: 30px;
    width: 600px;
    justify-content: space-around;
    .el-input {
        width: 200px;
    }
}
</style>