<script setup>
import { User, ChatLineSquare, DataAnalysis } from '@element-plus/icons-vue'

</script>

<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#2E3C56"
      class="el-menu-vertical"
      default-active="2"
      text-color="#fff"
  >
    <el-menu-item index="1">
      <el-icon><User /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><ChatLineSquare /></el-icon>
      <span>评论管理</span>
    </el-menu-item>
    <el-menu-item index="3">
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
