<template>
  <div class="tabbar">
<div class="tabbar_left">
<Breadcrumb></Breadcrumb>
</div>
<div class="tabbar_right">
 <setting></setting>
</div>
  </div>
</template>

<script setup lang="ts">
//引入面包屑导航
import Breadcrumb from './Breadcrumb/index.vue'
//引入顶部导航栏右侧设置
import setting from './Setting/index.vue';
defineOptions({
  name:'Tabbar'
})
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .tabbar_left{
    
    display: flex;
    align-items: center;
  }
  .tabbar_right{
     display: flex;
    align-items: center;
  }
}
</style>