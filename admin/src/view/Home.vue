<template>
  <Nav />
  <!-- <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>-->
  <router-view></router-view>
</template>
<script setup>
import Nav from "@/components/Nav.vue";
</script>