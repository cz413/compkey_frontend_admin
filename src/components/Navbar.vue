<script setup>
import {computed} from "vue";
import {Avatar} from "@element-plus/icons-vue";
import {ref} from 'vue'
import router from "@/router/index.js";
import store from "@/store/index.js";

const isLogin = computed(() => {
  const userId = store.state.userId
  return userId !== null && userId !== undefined
})

const avatarRef = ref()
const popoverRef = ref()

const signOut = () => {
  localStorage.removeItem('userId');
  store.commit('setUserId', null);
  router.push({path: '/login'});
}

</script>

<template>
  <div class="head-navi">
    <div class="logo-container">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="网络不行哟" class="logo-img">
      </router-link>
    </div>
    <div class="head-navi-item">
      <div class="user-avatar" ref="avatarRef" v-if="isLogin">
        <el-icon size="30"><Avatar /></el-icon>
      </div>

      <el-popover
          ref="popoverRef"
          :virtual-ref="avatarRef"
          trigger="hover"
          virtual-triggering
      >
        <el-button @click="signOut" style="width: 100%">sign out</el-button>
      </el-popover>
    </div>
  </div>
</template>

<style scoped>
.head-navi {
  width: 100%;
  height: 60px;
  background-color: #2E3C56;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo-container{
    margin-left: 20px;
    .logo-img {
      height: 50px;
    }
  }

  .head-navi-item {
    display: flex;
    justify-content: space-between;
    a {
      color: #BDC1CA;
      margin: 0 20px;
    }
  }

  .user-avatar {
    color: #BDC1CA;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
    cursor: pointer;
  }

}
</style>
