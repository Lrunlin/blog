<template>
  <Nav />
  <div class="container" :class="{ animate: animate }">
    <router-view></router-view>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import Nav from "@/components/Nav.vue";
import { useRouter, useRoute } from "vue-router";
let router = useRouter();
let route = useRoute();

let animate = ref('animate');
let _router = route.path;//缓存上次的路由
router.beforeEach((to, from, next) => {
  let isLink = to.matched.find(item => item.path == '/')//父级路由判断是否可以使用动画
  if (to.path != _router && isLink) {
    animate.value = false;
    setTimeout(() => {
      animate.value = 'animate';
    }, 0);
    _router = to.path;
  }
  next()
});

</script>
<style  lang='scss'>
.container {
  padding-bottom: 30px;
  transform: translateZ(0);
}
@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0) scaleY(3);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0) scaleY(0.9);
  }

  75% {
    transform: translate3d(0, -10px, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, 5px, 0) scaleY(0.985);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.animate {
  animation: bounceInDown 0.8s forwards;
}
</style>