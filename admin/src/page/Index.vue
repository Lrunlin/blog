<template>
  <div class="header">
    <div class="header-item">
      <Icon size="42" icon="文章" />
      <div>
        <p class="header-item_title">文章</p>
        <p class="header-item_content">
          <span>{{ data.article_count }}</span>
          <b style="margin-left: 10px">({{ data.article_count_admin }})</b>
        </p>
      </div>
    </div>
    <div class="header-item">
      <Icon size="42" icon="标签" />
      <div>
        <p class="header-item_title">标签</p>
        <p class="header-item_content">{{ data.type_count }}</p>
      </div>
    </div>
    <div class="header-item">
      <Icon size="42" icon="用户" />
      <div>
        <p class="header-item_title">用户</p>
        <p class="header-item_content">{{ data.user_count }}</p>
      </div>
    </div>
    <div class="header-item">
      <Icon size="42" icon="开放" />
      <div>
        <p class="header-item_title">开放API</p>
        <p class="header-item_content">{{ data.api_count }}</p>
      </div>
    </div>
  </div>
  <div class="os-title">系统信息</div>
  <div class="os-content">
    <div class="os-content_item">
      <div class="os-content_item_title">
        <Icon icon="环境数据" size="28" />
        <span>运行环境</span>
      </div>
      <div class="os-content_item_data">
        <div>Node.js</div>
        <div>{{ data.node_version }}</div>
      </div>
    </div>
    <div class="os-content_item">
      <div class="os-content_item_title">
        <Icon icon="电脑系统" size="28" />
        <span>系统信息</span>
      </div>
      <div class="os-content_item_data">
        <p>
          {{ data.os }}
        </p>
        <p>{{ data.os_version }}</p>
      </div>
    </div>
    <div class="os-content_item">
      <div class="os-content_item_title">
        <Icon icon="时间" size="28" />
        <span>运行时间</span>
      </div>
      <div class="os-content_item_data">{{ dayjs(new Date() - data.uptime * 1000).fromNow() }}</div>
    </div>
    <!-- 负载情况在Window不显示 -->
    <div class="os-content_item" v-if="data.loadavg">
      <div class="os-content_item_title">
        <Icon icon="负载均衡" size="28" />
        <span>负载情况</span>
      </div>
      <div class="os-content_item_data">
        <el-tooltip
          v-for="(item, index) in data.loadavg"
          effect="dark"
          :content="setTips(index)"
          placement="top"
          :key="Math.random()"
          :style="{ marginLeft: index != 0 ? '5px' : '0px' }"
        >
          <el-progress type="circle" :percentage="+(item * 100).toFixed(0)" :width="50" />
        </el-tooltip>
      </div>
    </div>
    <div class="os-content_item">
      <div class="os-content_item_title">
        <Icon icon="内存" size="28" />
        <span>内存使用</span>
      </div>
      <div class="os-content_item_data">
        {{ formatSize(data.memory_total - data.memory_free) }}
        /
        {{ formatSize(data.memory_total) }}
        <el-progress
          v-if="data.memory_total"
          :percentage="
            +(((data.memory_total - data.memory_free) / data.memory_total) * 100).toFixed(2)
          "
        />
      </div>
    </div>
  </div>
  <AccessRecordEcharts :data="data.access_record" />
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

import Icon from "@/components/Icon.vue";
import AccessRecordEcharts from "@/components/AccessRecord.vue";

let data = ref({});
axios.get("/admin/init").then(res => {
  data.value = res.data.data;
});
const setTips = index => {
  const list = [1, 5, 15];
  return `${list[index]}分钟负载情况`;
};
/** 格式化大小*/
const formatSize = fileSize => {
  let result = "";
  if (fileSize >= 1048576) {
    result =
      fileSize % 1048576 === 0 ? fileSize / 1048576 + "MB" : Math.trunc(fileSize / 1048576) + "MB";
  } else if (fileSize >= 1024) {
    result = fileSize % 1024 === 0 ? fileSize / 1024 + "KB" : Math.trunc(fileSize / 1024) + "KB";
  } else {
    result = fileSize + "B";
  }
  return result;
};
</script>
<style scoped lang="scss">
$borderColor: rgb(219, 219, 219);
.header {
  display: flex;
  flex-wrap: wrap;
  background-color: $borderColor;
  padding-bottom: 2px;
  .header-item {
    display: flex;
    align-items: center;
    height: 70px;
    width: calc(50% - 0.5px);
    background-color: white;
    &:nth-child(even) {
      margin-left: 1px;
    }
    &:nth-child(n + 3) {
      margin-top: 1px;
    }

    .icon {
      margin-left: 15px;
    }
    p {
      margin: 0px;
      margin-left: 40px;
    }
    .header-item_title {
      color: gray;
      font-size: 14px;
    }
    .header-item_content {
      color: black;
      font-weight: 700;
    }
  }
}
.os-title {
  height: 40px;
  padding-left: 15px;
  border-bottom: 1px solid $borderColor;
  display: flex;
  align-items: center;
}
.os-content {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  .os-content_item_title {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
      font-size: 14px;
      color: rgb(155, 155, 155);
      font-weight: 700;
    }
  }
  .os-content_item_data {
    margin-top: 10px;
    font-size: 14px;
    color: rgb(155, 155, 155);
    p {
      margin: 0px;
    }
  }
}
</style>
