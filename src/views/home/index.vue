<template>
  <div>
我是一级路由首页
  </div>
</template>

<script setup lang="ts">
import useUSerStore from '@/store/modules/user';
import { onMounted } from 'vue';
//获取仓库
const userStore = useUSerStore()
//挂载后发送请求，获取用户信息
onMounted(()=>{
  userStore.userInfo()
  })
</script>

<style scoped>

</style>