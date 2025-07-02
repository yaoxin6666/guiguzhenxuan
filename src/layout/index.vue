<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu 
        background-color="#001529" 
        text-color="white" 
        style="border-right: none;"
        :default-active = "$route.path"
        >
          <!-- 根据路由动态生成菜单 -->
        <Menu :menuList="userStore.menuRoutes"></Menu>
      </el-menu>
      </el-scrollbar>
      
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo/index.vue'
//引入菜单组件
import  Menu from './Menu/index.vue'
//引入用户相关仓库
import useUSerStore from '@/store/modules/user';
//引入右侧展示区域
import Main from './Main/index.vue'
//引入顶部导航栏
import Tabbar from './Tabbar/index.vue'
//获取路由对象
import { useRoute } from 'vue-router';
const userStore = useUSerStore()
const $route = useRoute()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: skyblue;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    .scrollbar{
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    background-color: pink;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    background-color: yellow;
  }
}
</style>
