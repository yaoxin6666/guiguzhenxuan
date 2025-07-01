<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">123</div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">456</div>
    <!-- 内容展示区域 -->
    <div class="layout_main">789</div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.layout_container {
width: 100%;
height: 100vh;
background-color: skyblue;
.layout_slider {
  width: $base-menu-width;
  height: 100vh;
  background-color:$base-menu-background;
}
.layout_tabbar {
  position: fixed;
  width: calc(100% - $base-menu-width);
  height: $base-tabbar-height;
  top: 0px;
  left: $base-menu-width ;
  background-color:pink;
}
.layout_main{
  position: absolute;
  width:calc(100% - $base-menu-width) ;
  height: calc(100vh - $base-tabbar-height);
  left: $base-menu-width;
  top:$base-tabbar-height ;
  margin: 20px;
  background-color: yellow;
}
}
</style>