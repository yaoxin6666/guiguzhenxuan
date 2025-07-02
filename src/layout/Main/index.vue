<template>
  <div>
    <!--二级路由出口  -->
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" v-if="flag"/>
  </transition>
</router-view>
  </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/LayoutSetting';
import { ref ,nextTick,watch} from 'vue';
const layoutSettingStore = useLayoutSettingStore()
//控制当前组件是否销毁重建
let flag = ref(true)
defineOptions({
  name:'Main'
})
//refresh发生变化后，销毁页面
watch(()=>layoutSettingStore.refresh,()=>{
  flag.value=false
  //重建页面
  nextTick(()=>{
    flag.value=true
  }
  )
})
</script>

<style scoped>

</style>