<script setup>
import {post} from '../apis/request.js';
import { ElMessage } from 'element-plus';
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import store from "@/store/index.js";

// 使用 ref 创建响应式的 username 和 password 变量
const username = ref('admin');
const password = ref('123456');
const router = useRouter();

function login(url, params) {
  post(url, params)
      .then(response => {
        console.log(response.status === 200)
        if (response.status === 200) {
          // 跳转到 HomePage
          router.push({path: '/home'});

          // 将username作为token保存
          localStorage.setItem('userId', response.data.data.id)
          // 将username存入store中
          store.commit('setUserId', response.data.data.id)

          ElMessage({
            message: '登陆成功！',
            type: 'success'
          });
        } else {
          ElMessage({
            message: "登录失败，请重试！",
            type: "error",
          });
        }
      })
      .catch(error => {
        ElMessage({
          message: "请求失败，请稍后再试！",
          type: "error",
        });
        console.log(error)
      });
}
function handleLogin(){
  login('/users/login', { username: username.value, password: password.value });
}

</script>

<template>
  <div class="container">
    <h1>Sign in</h1>
    <div class="main-body">
      <div class="QR-Code">
        <img src="@/assets/logo.png" alt="网络不行哟" class="logo-img">
      </div>
      <div class="mid">
        <div class="vertical-line"></div>
      </div>
      <div class="data">
        <label class="username" for="username">Username</label>
        <input type="text" id="username" v-model=" username" placeholder="请输入用户名"/>
        <label class="password" for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="请输入密码"/>
        <input type="button" value="Login" @click="handleLogin">
        <router-link :to="{ path: '/register' }" class="link">Don't have an account? Click here.</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 60px - 50px);
  width: 100vw;
  background-color: #EBECEE;
  margin: 0;

  h1 {
    margin: 5px;
    font-weight: bolder;
    font-size: 50px;
  }

  .main-body {
    align-items: center;
    display: flex;
    height: 80%;
    width: 60%;
    background-color: white;

    .QR-Code {
      display: flex;
      height: 80%;
      width: 48%;
      justify-content: center; /* 水平居中 */
      align-items: center;
    }
    .logo-img {
      max-width: 100%;
      max-height: 100%;
      margin-top: -10%;
    }

    .mid {
      width: 3%;
      height: 90%;

      span {
        color: #C4C4C4;
      }
    }
  }

  .vertical-line {
    width: 2px;
    height: 100%;
    background-color: #C4C4C4;
    position: relative;
    margin: auto;
  }

  .data {

    width: 50%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    display: flex;
    gap: 10px;

    .username {
      margin-left: -65%;
      margin-top: 20%;
    }

    .password {
      margin-left: -65%;
      margin-top: 10%;
    }

    input[type=text] {
      width: 80%;
      height: 10%;
      border: none;
      border-bottom: 1px solid #000;
    }

    input[type=password] {
      width: 80%;
      height: 10%;
      border: none;
      border-bottom: 1px solid #000;
    }

    input[type=button] {
      width: 40%;
      height: 10%;
      background-color: var(--themeColor);
      margin-top: 10%;
      border: none;
      cursor: pointer;
      font-weight: lighter;
      font-size: larger;
    }

    input[type=button]:hover {
      background-color: #FF9F40;
    }

    input[type="text"]:focus,
    input[type="password"]:focus {
      outline: none;
      border-bottom: 2px solid var(--themeColor);
    }

    .link {
      color: dodgerblue;
      width: 55%;
      height: 5%;
      font-size: smaller;
      margin: auto;
    }
  }
}
</style>
