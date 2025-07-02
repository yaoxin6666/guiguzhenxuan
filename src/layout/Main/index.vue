<template>
  <div>
    <!--二级路由出口  -->
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>