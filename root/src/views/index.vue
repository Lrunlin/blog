<template>
  <navigation></navigation>
  <router-view></router-view>
</template>
<script>
import { reactive, toRefs } from "vue";
import navigation from "@/components/navigation.vue";
import { useStore } from "vuex";
export default {
  components: {
    navigation,
  },
  setup() {
    return {};
  },
};
</script>
<style scoped lang='scss'>
body::-webkit-scrollbar {
  display: none;
}
body {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
</style>