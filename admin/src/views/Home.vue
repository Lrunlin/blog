<template>
  <Nav></Nav>
  <router-view></router-view>
</template>
<script setup>
import { ref } from "vue";
import jsCookie from "js-cookie";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Nav from "@/components/Nav";
import axios from "axios";
import md5 from "md5";
const router = useRouter();
const store = useStore();
axios
  .post("/logn-in", {
    admin: jsCookie.get("admin"),
    password: jsCookie.get("password"),
  })
  .then((res) => {
    const token = `刘润霖0621${jsCookie.get("admin")}刘润霖0621${jsCookie.get(
      "password"
    )}`;
    if (md5(token) != jsCookie.get("token")) {
      router.replace("/logn-in");
    }
  });
// jsCookie.remove("token");
</script>
<style scoped lang='scss'>
</style>