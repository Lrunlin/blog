<template>
    <div style="margin-bottom: 20px;">
        <el-tag
            v-for="(item,index) in history"
            :type="item.type"
            :closable="history.length > 1"
            :style="{ marginLeft: index ? '10px' : '', }"
            @close="close(item.href)"
            @click="router.push(item.href)"
        >{{ item.tag }}</el-tag>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';


let route = useRoute();
let router = useRouter();
let history = ref([{
    tag: route.meta.title,
    href: route.path,
    type: ''
}]);
let setType = () => {
    let typeList = ['', 'success', 'info', 'warning', 'danger'];
    let index = Math.floor((Math.random() * typeList.length));
    return typeList[index];}router.beforeEach((to, form, next) => {
    if (history.value.some(item => item.tag == to.meta.title)) {

    } else {
        history.value.push({
            tag: to.meta.title,
            href: to.path,
            type: setType()
        })
    }
    next();
});

function close(href) {
    history.value = history.value.filter(item => item.href != href);
}


</script>
<style scoped lang='scss'>
.el-tag {
    cursor: pointer;
}
</style>