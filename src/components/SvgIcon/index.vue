<template>
  <svg :style="{width,height}">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  //前缀
  prefix:{
    type:String,
    default:'#icon-'

  },
  //使用的字体图标名字
  name:{
    type:String,
    default:''

  },
  //颜色
  color:{
    type:String,
    default:''
  },
  //宽度
  width:{
    type:String,
    default:'16px'
  },
  // 高度
  height:{
    type:String,
    default:'16px'
  }
})
</script>

<style lang="scss" scoped>

</style>