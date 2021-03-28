<template>
  <div class="about-box">
    <div class="about">
      <h2 class="about-title">关于</h2>
      <p class="about-text">
        !!:本站作品均为本人原创,文章观点、思路仅代表个人想法。
      </p>
      <div class="about-main">
        本站为本人学习、分享网站，网站搭建会使用本人最新学习的技术，并频繁更新(<a
          href="https://github.com/Lrunlin/blog"
          target="_blank"
          >本站源码</a
        >)，平时也会分享技术文章，力扣算法
      </div>
    </div>
    <div class="writer">
      <div class="writer-title">个人介绍</div>
      <div>
        大连东软信息学院19届计算机应用技术学生，内蒙古呼伦贝尔人，主要学习内容为web开发
      </div>
      <div>联系方式：</div>
      <ul>
        <li>邮件：<a href="mailto:1974109227@qq.com">1974109227@qq.com</a></li>
        <li>QQ：1974109227</li>
      </ul>
      <div class="support">
        <div class="support-title">支持本站</div>
        <div>
          坚持写文章并不是一件容易的事，如果你认为我的文章对你有帮助，欢迎将本站推荐给你的小伙伴！或者去我的<a
            href="https://github.com/Lrunlin/blog"
            target="_blank"
            >GitHub</a
          >star一下吧
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
</script>
<style scoped lang='scss'>
.about-box {
  min-width: 800px;
  max-width: 1500px;
  padding-right: 20px;
  word-break: break-all;
}
.about {
  .about-title {
    margin-top: 20px;
    font-size: 30px;
    font-weight: 400;
  }
  .about-text {
    color: red;
    margin-top: 10px;
  }
  .about-main {
    margin-top: 10px;
    color: rgb(75, 75, 75);
  }
}
.writer {
  margin-top: 20px;
  .writer-title {
    font-weight: 700;
    font-size: 22px;
  }
  li {
    margin-top: 10px;
  }
}
.support {
  margin-top: 20px;
  .support-title {
    font-weight: 700;
    font-size: 22px;
    margin-bottom: 10px;
  }
  a {
    font-weight: 900;
  }
}
</style>