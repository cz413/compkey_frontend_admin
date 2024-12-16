<script setup>

</script>

<template>
  <div class="head-navi">
    <div class="logo-container">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="网络不行哟" class="logo-img">
      </router-link>
    </div>
    <div class="head-navi-item">
      <router-link to="/">Sign in</router-link>
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
}
</style>
