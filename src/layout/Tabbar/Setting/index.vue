<template>
  <el-button icon="Refresh" circle @click="Refash"/>
  <el-button icon="FullScreen" circle  @click="fullScreen"/>
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

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/LayoutSetting';
//控制刷新
const layoutSettingStore = useLayoutSettingStore()
defineOptions({
  name:'Setting'
})
//刷新
const Refash = () =>{
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
//全屏切换const 
const fullScreen = ()=>{
//dom对象的一个属性，可以用来判断是否为全屏，[全屏：true，不是全屏：false]
let full=document.fullscreenElement
if(!full){
  //实现全屏
  document.documentElement.requestFullscreen()
}else{
  //退出全屏
  document.exitFullscreen()
}
}
</script>


<style scoped></style>
