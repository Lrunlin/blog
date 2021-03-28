<template>
  <!-- https://imququ.com/ -->
  <!-- 安这个样式改 -->
  <header>
    <img
      src="../assets/writer-face.png"
      alt="左侧导航栏作者头像"
      class="writer-face"
    />
    <nav>
      <h1 class="writer-name">{{ store.state.name }}</h1>
      <p class="write-text">WEB开发</p>
      <div class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/search">搜索</router-link>
        <router-link to="/">作者简历</router-link>
        <router-link to="/about">关于</router-link>
      </div>
      <div class="navs">
        <a href="https://github.com/Lrunlin">
          <img
            src="../assets/github.png"
            alt="作者GitHub"
            class="clearMargin"
          />
        </a>
        <a href="javascript:;" @click="isAlert = 'wechat'">
          <img src="../assets/wechat.png" alt="作者微信" />
        </a>
        <a href="javascript:;" @click="isAlert = 'qq'">
          <img src="../assets/qq.png" alt="作者QQ" />
        </a>
      </div>
    </nav>
  </header>
  <div class="alert" v-if="isAlert" @click="isAlert = null">
    <img
      src="@/assets/wechat-qrcode.jpg"
      alt="作者微信二维码"
      v-if="isAlert == 'wechat'"
      @click.stop=""
    />
    <img
      src="@/assets/qq-qrcode.jpg"
      alt="作者QQ二维码"
      v-if="isAlert == 'qq'"
      @click.stop=""
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
let store = useStore();

let isAlert = ref();
</script>
<style scoped lang='scss'>
header {
  width: 270px;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background-image: url("../assets/left-bg2.jpg");
  background-size: cover;
  .writer-face {
    width: 160px;
    border-radius: 50%;
    margin-left: 55px;
    margin-top: 50px;
  }
  nav {
    width: 160px;
    margin-left: 55px;
    .writer-name {
      font-weight: 400;
      color: white;
      margin-top: 15px;
    }
    .write-text {
      color: white;
      margin-top: 10px;
    }
    .nav {
      margin-top: 20px;
      a {
        text-decoration: none;
        display: block;
        height: 35px;
        line-height: 35px;
        color: #fff;
        text-shadow: 0 1px #666;
        font-size: 14px;
        &:hover {
          background-color: rgb(223, 223, 223, 0.1);
        }
      }
    }
    .navs {
      margin-top: 20px;
      img {
        width: 30px;
        margin-left: 5px !important;
      }
      .clearMargin {
        margin-left: 0px !important;
      }
    }
  }
}
.alert {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0, 0.3);
  line-height: 100vh;
  text-align: center;
  img {
    width: 200px;
  }
}
</style>