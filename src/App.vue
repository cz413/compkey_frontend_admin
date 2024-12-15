<script setup>
import Navbar from "@/components/Navbar.vue";

</script>

<template>
  <Navbar />
  <router-view></router-view>
</template>

<style>
/* 取消router-link的默认样式 */
.router-link-active {
  text-decoration: none;
  color: #fff;
}
a {
  text-decoration: none;
  color: #fff;
}
</style>
