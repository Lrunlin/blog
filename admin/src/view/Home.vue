<template>
  <Nav />
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template>
<script setup>
import { ref, watchEffect, useSlots } from "vue";
import Nav from "@/components/Nav.vue";
import { useRouter, useRoute } from "vue-router";

let router = useRouter();
let route = useRoute();

</script>
<style scoped lang='scss'>
</style>