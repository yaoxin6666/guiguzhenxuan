<template>
  <el-button icon="Refresh" circle />
  <el-button icon="FullScreen" circle />
  <el-button icon="Setting" circle />
  <img
    src="../../../../public/logo.jpg"
    alt=""
    style="width: 32px; height: 32px; border-radius: 16px; margin: 0 10px"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts"></script>

<style scoped></style>
