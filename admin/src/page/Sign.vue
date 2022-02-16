<template>
  <div class="login">
    <div class="top">
      <div class="header">
        <a>
          <img src="@/assets/logo.png" class="logo" alt="logo" />
          <span class="title">欢迎登陆</span>
        </a>
      </div>
      <div class="desc">github.com/Lrunlin/blog</div>
    </div>
    <div class="main">
      <el-form ref="formDOM" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="admin">
          <el-input :prefix-icon="User" v-model="form.admin" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input :prefix-icon="Lock" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="testCode">
          <div class="test-code">
            <el-input v-model="form.testCode" placeholder="请输入验证码"></el-input>
            <TestCode
              title="换一张"
              :identifyCode="code"
              class="code"
              @click="code = setRandomCode()"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>

      <div class="login-tips">
        <span>系统推荐浏览器</span>&nbsp;<br /><br />
        <div class="browsers">
          <a href="https://www.microsoft.com/zh-cn/edge" target="_blank" title="微软 Edge">
            <Icon icon="edge" size="20" />&nbsp;Edge
          </a>
          <a href="https://www.google.cn/chrome/" target="_blank" title="谷歌 Chrome">
            <Icon icon="chrome" size="20" />&nbsp;Chrome
          </a>
          <a href="http://www.firefox.com.cn/" target="_blank" title="火狐 Firefox">
            <Icon icon="firefox" size="20" />&nbsp;Firefox
          </a>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="links">
        <a href="/">首页</a>
        <a>帮助</a>
        <a>隐私</a>
        <a>条款</a>
      </div>
      <div class="copyright">
        Copyright &copy; {{ new Date().getFullYear() }}&nbsp;<a
          target="_blank"
          href="https://github.com/Lrunlin/blog"
          >github.com/Lrunlin/blog</a
        >&nbsp;&nbsp;<a target="_blank" href="https://blogweb.com">blogweb.cn</a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { useRouter } from "vue-router";
import { User, Lock } from "@element-plus/icons";
import Icon from "@/components/Icon.vue";
import TestCode from "@/components/Code.vue";

let router = useRouter();
let form = ref({ admin: "", password: "", testCode: "" });
function setRandomCode() {
  function random(max, min) {
    return Math.round(Math.random() * (max - min) + min);
  }
  let str = "1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM"; //给一个空字符串
  let res = "";
  for (let i = 0; i < 4; i++) {
    res += str[random(0, 62)];
  }
  return res.substring(0, 4);
}
let code = ref(setRandomCode());
let rules = {
  admin: [
    {
      required: true,
      message: "请填写管理员账号",
      trigger: "blur",
    },
    {
      min: 3,
      max: 15,
      message: "管理员账号长度在3-15",
      trigger: "blur",
    },
    {
      validator: (rule, value) => /^[A-Za-z0-9]+$/.test(value),
      message: "管理员长高为数字或字母",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "请填写管理员密码",
      trigger: "blur",
    },
  ],
  testCode: [
    {
      required: true,
      message: "请填写验证码",
      trigger: "blur",
    },
    {
      message: "验证码错误",
      trigger: "blur",
      validator: (rule, value) => code.value.toLocaleLowerCase() == value.toLocaleLowerCase(),
    },
  ],
};
let formDOM = ref(null);
function submitForm() {
  formDOM.value.validate(valid => {
    if (!valid) {
      return false;
    }
    axios
      .get("/admin/token", { params: { admin: form.value.admin, password: form.value.password } })
      .then(res => {
        if (res.data.success) {
          ElMessage.success(res.data.message);
          localStorage.token = res.data.data;
          router.replace("/");
        } else {
          ElMessage.error(res.data.message);
        }
      });
  });
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  min-height: 100vh;
  background: #f0f2f5 url(@/assets/bg.svg) no-repeat 50%;
  background-size: 100%;
  position: relative;
  user-select: none;
  a {
    text-decoration: none;
  }
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
        border-style: none;
        border-radius: 50%;
      }
      .title {
        font-size: 30px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.45);
      margin-top: 12px;
      margin-bottom: 30px;
    }
  }
  .main {
    min-width: 260px;
    width: 368px;
    margin: 0 auto;
    .login-tips {
      text-align: left;
      margin-top: 10px;
      line-height: 22px;
      font-size: 16px;
      a {
        color: rgba(0, 0, 0, 0.45);
        transition: all 0.3s;
        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
  }
  .footer {
    width: 100%;
    bottom: 0;
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;
    .links {
      margin-bottom: 8px;
      font-size: 14px;
      a {
        color: rgba(0, 0, 0, 0.45);
        transition: all 0.3s;
        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }
}
.browsers {
  display: flex;
  height: 30px;
  a {
    display: flex;
  }
}
.test-code {
  display: flex;
  justify-content: space-between;

  .el-input {
    width: 60%;
  }
}
.lizi {
  width: 500px;
  height: 400px;
}
</style>
