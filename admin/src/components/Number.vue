<template>
  <span @click="stopTimer">{{ num }}</span>
</template>
<script setup>
import { ref, onUnmounted, watchEffect } from "vue";
let props = defineProps({
  number: {
    type: Number,
    default: "create",
    required: true,
  },
});

let timer = null;
let num = ref(0);
watchEffect(() => {
  clearInterval(timer);
  let number = props.number.toFixed(0);
  timer = setInterval(() => {
    if (num.value == number) {
      clearInterval(timer);
    } else {
      if (num.value >= number) {
        num.value--;
      } else {
        num.value++;
      }
    }
  }, (800 / number).toFixed(0));
});
function stopTimer() {
  clearInterval(timer);
}
onUnmounted(() => {
  clearInterval(timer);
});
</script>
<style scoped lang="scss"></style>
