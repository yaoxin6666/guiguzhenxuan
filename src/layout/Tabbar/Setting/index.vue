<template>
  <el-button icon="Refresh" circle @click="Refash" />
  <el-button icon="FullScreen" circle @click="fullScreen" />

  <el-popover placement="top-start" :width="300" trigger="hover">
    <template #default>
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            v-model="color"
            show-alpha
            :predefine="predefineColors"
            :teleported="false"
            @change="setColor"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            @change="changeDark"
            v-model="value"
            active-action-icon="Moon"
            inactive-action-icon="Sunny"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #reference>
      <el-button icon="Setting" circle />
    </template>
  </el-popover>
  <img
    :src="userStore.avatar"
    alt=""
    style="width: 32px; height: 32px; border-radius: 16px; margin: 0 10px"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/LayoutSetting'
import useUSerStore from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
const userStore = useUSerStore()
//获取路由对象
const $route = useRoute()
const $router = useRouter()
//暗黑模式开关
let value = ref(false)
//控制刷新
const layoutSettingStore = useLayoutSettingStore()
defineOptions({
  name: 'Setting',
})
//刷新
const Refash = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
//全屏切换const
const fullScreen = () => {
  //dom对象的一个属性，可以用来判断是否为全屏，[全屏：true，不是全屏：false]
  let full = document.fullscreenElement
  if (!full) {
    //实现全屏
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}
//退出登录
const logout = async () => {
  await userStore.logout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
  ElNotification({
    type: 'success',
    title: '退出登录成功',
  })
}
//暗黑模式切换
const changeDark = () => {
  let html = document.documentElement
  value.value ? (html.className = 'dark') : (html.className = '')
}
//设置主题色
const setColor = () =>{
   let html = document.documentElement
   html.style.setProperty('--el-color-primary',color.value)
}
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
</script>

<style scoped></style>
