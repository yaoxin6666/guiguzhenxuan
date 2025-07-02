<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p :class="{ fold: layoutSettingStore.fold ? true : false }">
      {{ setting.title }}
    </p>
  </div>
</template>

<script setup lang="ts">
//引入设置标题与logo的配置文件
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/LayoutSetting'
const layoutSettingStore = useLayoutSettingStore()
defineOptions({
  name: 'Logo',
})
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  padding: 10px;
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
  p {
    margin-left: 10px;
    font-size: $base-logo-title-fontSize;
    color: white;
    &.fold{
      display: none;
    }
  }
}
</style>
