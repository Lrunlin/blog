<template>
  <div class="item">
    <img src="@/assets/analysis/left_top.png" class="left_top" alt="" />
    <img src="@/assets/analysis/right_bottom.png" class="right_bottom" alt="" />
    <div class="_item">
      <div class="title">系统名称</div>
      <div class="content">
        {{ props.os }}
      </div>
    </div>
    <img src="@/assets/analysis/sper.png" alt="" />
    <div class="_item">
      <div class="title">内存占用</div>
      <div class="content">
        <NumberComponent :number="memory" />%
      </div>
    </div>
    <img src="@/assets/analysis/sper.png" alt="" />
    <div class="_item">
      <div class="title">开机时间</div>
      <div class="content">
        {{ dayjs(new Date() - props.time * 1000).fromNow() }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { Tickets, PriceTag, UserFilled } from "@element-plus/icons";
import NumberComponent from "@/components/Number.vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

let props = defineProps({
  os: {
    type: String,
    required: true,
    default: "Linux",
  },
  memory_total: {
    type: Number,
    required: true,
    default: 0,
  },
  memory_free: {
    type: Number,
    required: true,
    default: 0,
  },
  time: {
    type: Number,
    required: true,
    default: 0,
  },
});
let memory = computed(() => {
  let occupy = props.memory_total - props.memory_free;
  return ((occupy / props.memory_total) * 100);
});
</script>
<style scoped lang="scss">
.item {
  color: white;
  height: 3.7vw;
  width: 33vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}
.title {
  color: #1aa1fd;
  font-size: 0.8vw;
}
.content {
  font-weight: 700;
  font-size: 1.5vw;
  margin-top: 0.5vw;
}
</style>
