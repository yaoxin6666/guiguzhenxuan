<template>
<template v-for="(item,index) in menuList" :key="item.path">
  <!-- 没有子路由 -->
   <template  v-if="!item.children" >
   <el-menu-item v-if="!item.meta.hidden" :index="item.path" >
  <template #title>
    <span>图标&nbsp;</span>
    <span>{{ item.meta.title }}</span>
  </template>
</el-menu-item> 
   </template>

<!-- 有且只有一个子路由 -->
 <template  v-if="item.children&&item.children.length==1">
<el-menu-item v-if="!item.meta.hidden" :index="item.children[0].path" >
   <template #title>
    <span>图标&nbsp;</span>
    <span>{{ item.children[0].meta.title }}</span>
  </template>
</el-menu-item>
 </template>

<!-- 有且不只有一个子路由 -->
 <template v-if="item.children&&item.children.length>1">
<el-sub-menu v-if="!item.children[0].meta.hidden" :index="item.path">
<template #title>
<span>{{ item.meta.title }}</span>
</template>
<Menu :menuList="item.children"></Menu>
</el-sub-menu>
 </template>

</template>
</template>

<script setup lang="ts">
defineOptions({
  name:'Menu'
})
defineProps(['menuList'])
</script>
<style scoped>

</style>