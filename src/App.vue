<script setup>
import Navbar from "@/components/Navbar.vue";
import Aside from '@/components/Aside.vue'
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute()
// 判断路由是否需要头部和侧边栏
const showHeaderAndAside = computed(()=>{
  return ['/login','/register'].indexOf(route.path) === -1
})

</script>

<template>
  <div class="common-layout">
    <el-container height="100%">
      <el-header><Navbar/></el-header>
      <el-container height="100%" v-if="showHeaderAndAside">
        <el-aside width="200px" height="100%"><Aside/></el-aside>
        <el-main><router-view/></el-main>
      </el-container>
      <router-view v-else/>
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
