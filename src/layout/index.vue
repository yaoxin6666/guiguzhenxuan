<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: layoutSettingStore.fold ? true : false }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          background-color="#001529"
          text-color="white"
          style="border-right: none"
          :default-active="$route.path"
          :collapse="layoutSettingStore.fold ? true : false"
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo/index.vue'
//引入菜单组件
import Menu from './Menu/index.vue'
//引入用户相关仓库
import useUSerStore from '@/store/modules/user'
//引入右侧展示区域
import Main from './Main/index.vue'
//引入顶部导航栏
import Tabbar from './Tabbar/index.vue'
//获取路由对象
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/LayoutSetting'
const userStore = useUSerStore()
const $route = useRoute()
const layoutSettingStore = useLayoutSettingStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
    }
   &.fold {
      width:$base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
