<script setup>
import { User, ChatLineSquare, DataAnalysis } from '@element-plus/icons-vue'
import router from "@/router/index.js";

function handleSelect(key, keyPath) {
  router.push({
    path: key,
  })
}


</script>

<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#2E3C56"
      class="el-menu-vertical"
      default-active="/home"
      text-color="#fff"
      router
      @select="handleSelect"
  >
    <el-menu-item index="/home">
      <el-icon><User /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="/commentsManage">
      <el-icon><ChatLineSquare /></el-icon>
      <span>评论管理</span>
    </el-menu-item>
    <el-menu-item index="/dataManage">
      <el-icon><DataAnalysis /></el-icon>
      <span>数据管理</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu-vertical {
  height: 100%;
}

</style>
