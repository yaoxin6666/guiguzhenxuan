<template>
  <el-icon style="margin: 0 10px">
    <component
      @click="changeIcon"
      :is="layoutSettingStore.fold ? 'Expand' : 'Fold'"
    ></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item,index) in $route.matched" :key =index :to="item.path" v-show="item.meta.title">
     <el-icon>
      <component :is="item.meta.icon"></component>
     </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/LayoutSetting'
import { useRoute } from 'vue-router'
defineOptions({
  name: 'Breadcrumb',
})
//控制菜单折叠仓库
const layoutSettingStore = useLayoutSettingStore()
//路由对象
const $route = useRoute()
//收缩折叠图标切换
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>

<style scoped></style>
