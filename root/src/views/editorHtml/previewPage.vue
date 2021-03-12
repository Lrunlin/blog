<template>
  <div v-html="html" @contextmenu.prevent="back"></div>
  <!-- 将页面预览页面的路由向上提一级，导航去掉，右键返回上一级路由 -->
</template>
<script>
import { ref, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    let store = useStore();
    let router = useRouter();
    let html = ref("");
    axios({
      url: "/previewPage",
      method: "GET",
      params: {
        html: store.state.html,
      },
    }).then((res) => {
      html.value = res.data.html;

    });
    onUnmounted(() => {
      document.getElementById('js').remove()
      document.getElementById('jquery').remove()


    })
    function back(e) {
      router.go(-1);
    }
    return { html, back };
  },
};
</script>
<style scoped lang='scss'>
.select-css-type {
  width: 120px;
  margin-top: 10px;
  margin-left: 30px;
}
</style>