<script setup>
import {post} from '../apis/request.js';
import { ElMessage } from 'element-plus';
import {ref} from 'vue';

// 使用 ref 创建响应式的 username 和 password 变量
const username = ref('');
const password = ref('');

function register(url, params) {
  post(url, params)
      .then(response => {
        if (response.status === 200) {
          ElMessage({
            message: '注册成功！',
            type: 'success'
          });
          this.username = ''
          this.password = ''
        } else {
          ElMessage({
            message: "注册失败，请重试！",
            type: "error",
          });
        }
      })
      .catch(error => {
        console.log(error)
        ElMessage({
          message: "请求失败，请稍后再试！",
          type: "error",
        });
      });
}
function handleRegister(){
  register('/users/register', {
    username: username.value,
    password: password.value,
    telephone: "12345678901",
    email: "gz@example.com" });
}
</script>

<template>
  <div class="container">
    <h1>Sign up</h1>
    <div class="main-body">
      <div class="QR-Code">
        <img src="@/assets/logo.png" alt="网络不行哟" class="logo-img">
      </div>
      <div class="mid">
        <div class="vertical-line"></div>
      </div>
      <div class="data">
        <label class="username" for="username">Username</label>
        <input type="text" id="username" placeholder="请输入用户名" v-model="username"/>
        <label class="password" for="password">Password</label>
        <input type="password" id="password" placeholder="请输入密码" v-model="password"/>
        <input type="button" value="Register" @click = "handleRegister">
        <router-link :to="{ path: '/login' }" class="link">Already have an account? Click here.</router-link>
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
      background-color: #FD8700;
      margin-top: 10%;
      border: none;
      cursor: pointer;
      font-weight: lighter;
      font-size: larger;
    }
    input[type=button]:hover{
      background-color: #FF9F40;
    }

    input[type="text"]:focus,
    input[type="password"]:focus {
      outline: none;
      border-bottom: 2px solid #FD8700;
    }
    .link{
      color: dodgerblue;
      width: 55%;
      height: 5%;
      font-size: smaller;
      margin: auto;
    }
  }
}
</style>
