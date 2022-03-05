<template>
  <div class="item">
    <img src="@/assets/analysis/left_top.png" class="left_top" alt="" />
    <img src="@/assets/analysis/right_bottom.png" class="right_bottom" alt="" />
    <div style="background-color: #d9523f; margin-top: 0px" class="_item">
      <el-icon><Tickets /></el-icon>
      <div>
        <div class="title">文章数量</div>
        <div class="content">
          <NumberComponent :number="props.article_count" />
        </div>
      </div>
    </div>
    <div style="background-color: #13d0b2" class="_item">
      <el-icon><PriceTag /></el-icon>
      <div>
        <div class="title">类型数量</div>
        <div class="content">
          <NumberComponent :number="props.type_count" />
        </div>
      </div>
    </div>
    <div style="background-color: #f6a645" class="_item">
      <el-icon><UserFilled /></el-icon>
      <div>
        <div class="title">用户数量</div>
        <div class="content">
          <NumberComponent :number="props.user_count" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import NumberComponent from "@/components/Number.vue";
import { Tickets, PriceTag, UserFilled } from "@element-plus/icons";
let props = defineProps({
  article_count: {
    type: Number,
    required: true,
    default: 0,
  },
  type_count: {
    type: Number,
    required: true,
    default: 0,
  },
  user_count: {
    type: Number,
    required: true,
    default: 0,
  },
});
</script>
<style scoped lang="scss">

._item {
  color: white;
  width: 15vw;
  height: 6.5vw;
  margin-top: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 1vw;
  }
  .content {
    font-weight: 900;
    font-size: 1.4vw;
    margin-top: 0.2vw;
  }
  .el-icon {
    font-size: 2.4vw;
    margin-right: 1.6vw;
  }
  div {
    text-align: center;
  }
}
</style>
