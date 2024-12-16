<script setup>
import Navbar from "@/components/Navbar.vue";
import Aside from '@/components/Aside.vue'

</script>

<template>
  <div class="common-layout">
    <el-container height="100%">
      <el-header><Navbar/></el-header>
      <el-container height="100%">
        <el-aside width="200px" height="100%"><Aside/></el-aside>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
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
.el-header {
  padding: 0 !important;
}
.common-layout {
  height: 100vh;
  .el-container {
    height: 100%;
  }
}
</style>
