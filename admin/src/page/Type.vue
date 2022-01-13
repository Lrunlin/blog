<template>
    <div class="type-header">
        <el-button type="primary" @click="activeTypeData = { time: new Date() }">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="type" label="类型" width="180" />
        <el-table-column label="是否显示" width="180">
            <template v-slot="scope">
                <el-icon size="22" color="green" v-if="scope.row.isShow">
                    <Check />
                </el-icon>
                <el-icon size="22" color="red" v-else>
                    <Close />
                </el-icon>
            </template>
        </el-table-column>
        <el-table-column prop="time" label="创建时间">
            <template v-slot="scope">
                <el-date-picker
                    :readonly="true"
                    v-model="scope.row.time"
                    type="datetime"
                    placeholder="修改发布时间"
                ></el-date-picker>
            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template v-slot="scope">
                <el-button
                    type="primary"
                    :icon="Edit"
                    circle
                    @click="activeTypeData = tableData[scope.$index]"
                ></el-button>
                <el-button
                    type="danger"
                    :icon="Delete"
                    circle
                    @click="remove(scope.row.type, scope.$index)"
                ></el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 展示框 -->
    <el-dialog
        v-model="isShowDialog"
        :destroy-on-close="true"
        @close="activeTypeData = {}"
        @open="type = activeTypeData.type"
        :lockScroll="false"
        title="文本信息"
        width="30%"
    >
        <el-form label-width="100px">
            <el-form-item label="类型">
                <el-input ref="input" v-model="activeTypeData.type"></el-input>
            </el-form-item>
            <el-form-item label="是否显示">
                <el-switch v-model="activeTypeData.isShow"></el-switch>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker v-model="activeTypeData.time" type="datetime" placeholder="选择创建时间" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button v-if="isModeCreate" type="primary" @click="create">添加</el-button>
            <el-button v-else type="primary" @click="update">确认修改</el-button>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, watchEffect } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { Close, Check, Edit, Delete } from '@element-plus/icons';
import { useRouter } from 'vue-router';

let router = useRouter();


let tableData = ref([]);
axios.get('/type').then(res => {
    tableData.value = res.data.data;
});

function remove(type, index) {
    axios.delete(`/type/${type}`).then(res => {
        if (res.data.success) {
            ElMessage.success('删除成功');
            tableData.value.splice(index, 1)
        } else {
            ElMessage.error('删除失败');
        };
    });
};

let activeTypeData = ref({});
let isShowDialog = ref(false);

/** 
 * todo 是否创建模式
 * ?弹窗分为创建模式和修改模式，为了公用一个弹窗
*/
let isModeCreate = ref(false);
watchEffect(() => {
    isShowDialog.value = !!Object.keys(activeTypeData.value).length;
    if (!isShowDialog.value) {
        isModeCreate.value = false;
    };
    //因为点击添加按钮会只设置time信息所以只有一个key的是添加模式
    if (Object.keys(activeTypeData.value).length == 1) {
        isModeCreate.value = true;
    }
});


function create() {
    axios.post('/type', { ...activeTypeData.value }).then(res => {
        if (res.data.success) {
            ElMessage.success(res.data.message);
            router.go(0);
        } else {
            ElMessage.error(res.data.message);
        };
    })
}

let type = ref();
function update() {
    axios.put(`/type/${type.value}`, { ...activeTypeData.value }).then(res => {
        if (res.data.success) {
            ElMessage.success(res.data.message);
            router.go(0);
        } else {
            ElMessage.error(res.data.message);
        };
    })
}

</script>

<style scoped lang='scss'>
.type-header {
    display: flex;
    justify-content: flex-end;
    padding: 10px 30px;
}
</style>

